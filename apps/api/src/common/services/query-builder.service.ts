import { Injectable } from '@nestjs/common';
import {
  FilterInput,
  QueryOptionsInput,
  SortInput,
} from '../dto/query-options.dto';

@Injectable()
export class QueryBuilderService {
  buildQueryOptions(options: QueryOptionsInput = {}) {
    const queryOptions: any = {};

    // Handle pagination
    if (options.pagination) {
      queryOptions.skip = options.pagination.skip || 0;
      queryOptions.take = options.pagination.take || 10;
    } else {
      queryOptions.skip = 0;
      queryOptions.take = 10;
    }

    // Handle sorting
    if (options.sort && options.sort.length > 0) {
      queryOptions.orderBy = options.sort.map((sortOption) =>
        this.buildSortOption(sortOption),
      );
    }

    // Handle filtering
    if (options.filters && options.filters.length > 0) {
      queryOptions.where = this.buildWhereClause(options.filters);
    }

    // Handle relation inclusion
    if (options.include && options.include.length > 0) {
      queryOptions.include = this.buildIncludeObject(options.include);
    }

    // Handle field selection
    if (options.select && options.select.length > 0) {
      queryOptions.select = this.buildSelectObject(options.select);
    }

    return queryOptions;
  }

  private buildSortOption(sortOption: SortInput) {
    return {
      [sortOption.field]: sortOption.direction,
    };
  }

  private buildWhereClause(filters: FilterInput[]) {
    // For complex filters with AND/OR logic, we would need to enhance this
    const whereClause: any = {};

    filters.forEach((filter) => {
      whereClause[filter.field] = this.buildFilterCondition(filter);
    });

    return whereClause;
  }

  private buildFilterCondition(filter: FilterInput) {
    switch (filter.operator) {
      case 'equals':
        return filter.value;
      case 'contains':
        return { contains: filter.value };
      case 'startsWith':
        return { startsWith: filter.value };
      case 'endsWith':
        return { endsWith: filter.value };
      case 'gt':
        return { gt: filter.value };
      case 'gte':
        return { gte: filter.value };
      case 'lt':
        return { lt: filter.value };
      case 'lte':
        return { lte: filter.value };
      case 'in':
        return {
          in: Array.isArray(filter.value) ? filter.value : [filter.value],
        };
      case 'not':
        return { not: filter.value };
      default:
        return filter.value;
    }
  }

  private buildIncludeObject(include: string[]) {
    const includeObject: any = {};
    include.forEach((relation) => {
      includeObject[relation] = true;
    });
    return includeObject;
  }

  private buildSelectObject(select: string[]) {
    const selectObject: any = {};
    select.forEach((field) => {
      selectObject[field] = true;
    });
    return selectObject;
  }
}
