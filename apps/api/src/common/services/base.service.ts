import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryBuilderService } from './query-builder.service';
import { QueryOptionsInput } from '../dto/query-options.dto';

// Define available Prisma models as a type
export type PrismaModel = keyof Omit<
  PrismaService,
  | '$connect'
  | '$disconnect'
  | '$on'
  | '$transaction'
  | '$use'
  | '$extends'
  | '$queryRaw'
  | '$executeRaw'
  | '$queryRawUnsafe'
  | '$executeRawUnsafe'
>;

@Injectable()
export class BaseService<Entity> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly queryBuilder: QueryBuilderService,
  ) {}

  /**
   * Execute a query with the given options
   * @param model The Prisma model to query
   * @param options Query options including pagination, sorting, filtering, etc.
   * @returns The query result
   */
  async executeQuery<T extends PrismaModel>(
    model: T,
    options: QueryOptionsInput = {},
  ): Promise<Entity[]> {
    const queryOptions = this.queryBuilder.buildQueryOptions(options);
    return (this.prisma[model] as any).findMany(queryOptions);
  }

  /**
   * Count records with the given filters
   * @param model The Prisma model to query
   * @param options Query options (only filters are used)
   * @returns The count of matching records
   */
  async count<T extends PrismaModel>(
    model: T,
    options: QueryOptionsInput = {},
  ): Promise<number> {
    const queryOptions = this.queryBuilder.buildQueryOptions(options);
    const whereClause = queryOptions.where || {};
    return (this.prisma[model] as any).count({ where: whereClause });
  }

  /**
   * Find a single record by ID
   * @param model The Prisma model to query
   * @param id The ID of the record to find
   * @param options Query options (only include and select are used)
   * @returns The found record or null
   */
  async findById<T extends PrismaModel>(
    model: T,
    id: number,
    options: QueryOptionsInput = {},
  ): Promise<Entity | null> {
    const queryOptions = this.queryBuilder.buildQueryOptions(options);
    const { include, select } = queryOptions;

    return (this.prisma[model] as any).findUnique({
      where: { id },
      include,
      select,
    });
  }

  /**
   * Create a new record
   * @param model The Prisma model to create in
   * @param data The data for the new record
   * @returns The created record
   */
  async create<T extends PrismaModel, CreateInput = any>(
    model: T,
    data: CreateInput,
  ): Promise<Entity> {
    return (this.prisma[model] as any).create({ data });
  }

  /**
   * Update a record by ID
   * @param model The Prisma model to update in
   * @param id The ID of the record to update
   * @param data The data to update
   * @returns The updated record
   */
  async update<T extends PrismaModel, UpdateInput = any>(
    model: T,
    id: number,
    data: UpdateInput,
  ): Promise<Entity> {
    return (this.prisma[model] as any).update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a record by ID
   * @param model The Prisma model to delete from
   * @param id The ID of the record to delete
   * @returns The deleted record
   */
  async delete<T extends PrismaModel>(model: T, id: number): Promise<Entity> {
    return (this.prisma[model] as any).delete({
      where: { id },
    });
  }
}
