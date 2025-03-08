import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryBuilderService } from './query-builder.service';
import { QueryOptionsInput } from '../dto/query-options.dto';
import { BaseService } from './base.service';

/**
 * A type-safe base service for a specific Prisma model
 * This service extends the generic BaseService but provides better type safety
 * for the create and update methods by using the specific model's input types
 */
@Injectable()
export abstract class TypedBaseService<
  Entity,
  CreateInput,
  UpdateInput,
  ModelName extends string,
> extends BaseService<Entity> {
  protected abstract readonly modelName: ModelName;

  constructor(
    protected readonly prismaService: PrismaService,
    protected readonly queryBuilderService: QueryBuilderService,
  ) {
    super(prismaService, queryBuilderService);
  }

  /**
   * Execute a query with the given options
   * @param options Query options including pagination, sorting, filtering, etc.
   * @returns The query result
   */
  async findAll(options: QueryOptionsInput = {}): Promise<Entity[]> {
    return super.executeQuery(this.modelName as any, options);
  }

  /**
   * Count records with the given filters
   * @param options Query options (only filters are used)
   * @returns The count of matching records
   */
  async countAll(options: QueryOptionsInput = {}): Promise<number> {
    return super.count(this.modelName as any, options);
  }

  /**
   * Find a single record by ID
   * @param id The ID of the record to find
   * @param options Query options (only include and select are used)
   * @returns The found record or null
   */
  async findOne(
    id: number,
    options: QueryOptionsInput = {},
  ): Promise<Entity | null> {
    return super.findById(this.modelName as any, id, options);
  }

  /**
   * Create a new record with type-safe input
   * @param data The data for the new record
   * @returns The created record
   */
  async createOne(data: CreateInput): Promise<Entity> {
    return super.create(this.modelName as any, data);
  }

  /**
   * Update a record by ID with type-safe input
   * @param id The ID of the record to update
   * @param data The data to update
   * @returns The updated record
   */
  async updateOne(id: number, data: UpdateInput): Promise<Entity> {
    return super.update(this.modelName as any, id, data);
  }

  /**
   * Delete a record by ID
   * @param id The ID of the record to delete
   * @returns The deleted record
   */
  async deleteOne(id: number): Promise<Entity> {
    return super.delete(this.modelName as any, id);
  }
}
