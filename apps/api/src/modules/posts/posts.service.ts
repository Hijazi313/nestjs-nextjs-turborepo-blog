import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseService } from '../../common/services/base.service';
import { QueryBuilderService } from '../../common/services/query-builder.service';
import { QueryOptionsInput } from '../../common/dto/query-options.dto';
import { FilterInput } from '../../common/dto/query-options.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService extends BaseService<Post> {
  private readonly MODEL = 'post';

  constructor(
    protected readonly prismaService: PrismaService,
    protected readonly queryBuilderService: QueryBuilderService,
  ) {
    super(prismaService, queryBuilderService);
  }

  createPost(createPostInput: CreatePostInput, userId: number): Promise<Post> {
    return super.create(this.MODEL, {
      ...createPostInput,
      author: { connect: { id: userId } },
      tags: {
        connectOrCreate: createPostInput.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    });
  }

  findAll(options: QueryOptionsInput = {}) {
    return this.executeQuery(this.MODEL, options);
  }

  postCount(options: QueryOptionsInput = {}) {
    return this.count(this.MODEL, options);
  }

  findOneById(id: number, options: QueryOptionsInput = {}) {
    return this.findById(this.MODEL, id, options);
  }

  // User can only update their own posts
  async updatePost(
    userId: number,
    id: number,
    updatePostInput: UpdatePostInput,
  ) {
    // Check if the user is the author of the post
    // const post = await this.findOneFirst(this.MODEL, {
    //   filters: [
    //     { field: 'id', operator: 'equals', value: id },
    //     { field: 'authorId', operator: 'equals', value: userId },
    //   ],
    // });
    const post = await this.findOneById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.authorId !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this post',
      );
    }
    return super.update(this.MODEL, id, {
      ...updatePostInput,
      tags: {
        set: [],
        connectOrCreate: updatePostInput.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    });
  }

  removePost(id: number) {
    return this.delete(this.MODEL, id);
  }

  async userPosts(userId: number, options: QueryOptionsInput = {}) {
    // Add a filter for the user ID
    const userFilter: FilterInput = {
      field: 'authorId',
      operator: 'equals',
      value: userId,
    };

    // Merge with existing filters or create new filters array
    const filters = options.filters
      ? [...options.filters, userFilter]
      : [userFilter];

    // Return the query with the updated options
    return this.executeQuery(this.MODEL, {
      ...options,
      filters,
    });
  }

  userPostsCount(userId: number, options: QueryOptionsInput = {}) {
    return this.count(this.MODEL, {
      ...options,
      filters: [{ field: 'authorId', operator: 'equals', value: userId }],
    });
  }
}
