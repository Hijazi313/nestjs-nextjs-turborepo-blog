import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryBuilderService } from './query-builder.service';
import { QueryOptionsInput } from '../dto/query-options.dto';

@Injectable()
export class BaseService {
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
  async executeQuery(model: string, options: QueryOptionsInput = {}) {
    const queryOptions = this.queryBuilder.buildQueryOptions(options);
    return (this.prisma as any)[model].findMany(queryOptions);
  }

  /**
   * Count records with the given filters
   * @param model The Prisma model to query
   * @param options Query options (only filters are used)
   * @returns The count of matching records
   */
  async count(model: string, options: QueryOptionsInput = {}): Promise<number> {
    const queryOptions = this.queryBuilder.buildQueryOptions(options);
    const whereClause = queryOptions.where || {};
    return (this.prisma as any)[model].count({ where: whereClause });
  }

  /**
   * Find a single record by ID
   * @param model The Prisma model to query
   * @param id The ID of the record to find
   * @param options Query options (only include and select are used)
   * @returns The found record or null
   */
  async findById(model: string, id: number, options: QueryOptionsInput = {}) {
    const queryOptions = this.queryBuilder.buildQueryOptions(options);
    const { include, select } = queryOptions;

    return (this.prisma as any)[model].findUnique({
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
  async create(model: string, data: any) {
    return (this.prisma as any)[model].create({ data });
  }

  /**
   * Update a record by ID
   * @param model The Prisma model to update in
   * @param id The ID of the record to update
   * @param data The data to update
   * @returns The updated record
   */
  async update(model: string, id: number, data: any) {
    return (this.prisma as any)[model].update({
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
  async delete(model: string, id: number) {
    return (this.prisma as any)[model].delete({
      where: { id },
    });
  }
}
