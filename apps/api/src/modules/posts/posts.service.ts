import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseService } from '../../common/services/base.service';
import { QueryBuilderService } from '../../common/services/query-builder.service';
import { QueryOptionsInput } from '../../common/dto/query-options.dto';
import { FilterInput } from '../../common/dto/query-options.dto';

@Injectable()
export class PostsService extends BaseService {
  private readonly MODEL = 'post';

  constructor(
    protected readonly prismaService: PrismaService,
    protected readonly queryBuilderService: QueryBuilderService,
  ) {
    super(prismaService, queryBuilderService);
  }

  createPost(createPostInput: CreatePostInput) {
    return super.create(this.MODEL, createPostInput);
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

  updatePost(id: number, updatePostInput: UpdatePostInput) {
    return super.update(this.MODEL, id, updatePostInput);
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
