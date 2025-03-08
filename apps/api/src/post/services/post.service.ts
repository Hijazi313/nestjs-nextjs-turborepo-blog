import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryBuilderService } from '../../common/services/query-builder.service';
import { TypedBaseService } from '../../common/services/typed-base.service';
import { QueryOptionsInput } from '../../common/dto/query-options.dto';

/**
 * Service for managing posts with type-safe operations
 */
@Injectable()
export class PostService extends TypedBaseService<
  Post,
  Prisma.PostCreateInput,
  Prisma.PostUpdateInput,
  'post'
> {
  protected readonly modelName = 'post';

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly queryBuilder: QueryBuilderService,
  ) {
    super(prisma, queryBuilder);
  }

  /**
   * Find posts by author ID
   * @param authorId The author ID to filter by
   * @param options Additional query options
   * @returns The found posts
   */
  async findByAuthor(
    authorId: number,
    options: QueryOptionsInput = {},
  ): Promise<Post[]> {
    const queryOptions = this.queryBuilder.buildQueryOptions(options);

    // Merge the author filter with any existing filters
    const mergedOptions = {
      ...queryOptions,
      where: {
        ...queryOptions.where,
        authorId,
      },
    };

    return this.prisma.post.findMany(mergedOptions);
  }

  /**
   * Find a post by slug
   * @param slug The slug to search for
   * @returns The found post or null
   */
  async findBySlug(slug: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { slug },
    });
  }

  /**
   * Create a post with a generated slug
   * @param data Post data without slug
   * @returns The created post
   */
  async createWithSlug(
    data: Omit<Prisma.PostCreateInput, 'slug'>,
  ): Promise<Post> {
    // Generate a slug from the title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return this.createOne({
      ...data,
      slug,
    });
  }
}
