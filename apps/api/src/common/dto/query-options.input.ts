import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  take?: number;
}

@InputType()
export class SortInput {
  @Field(() => String)
  field: string;

  @Field(() => String, { defaultValue: 'asc' })
  direction?: 'asc' | 'desc';
}

@InputType()
export class FilterInput {
  @Field(() => String)
  field: string;

  @Field(() => String)
  operator:
    | 'equals'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'not';

  @Field(() => String)
  value: any;
}

@InputType()
export class QueryOptionsInput {
  @Field(() => PaginationInput, { nullable: true })
  pagination?: PaginationInput;

  @Field(() => [SortInput], { nullable: true })
  sort?: SortInput[];

  @Field(() => [FilterInput], { nullable: true })
  filters?: FilterInput[];

  @Field(() => [String], { nullable: true })
  include?: string[];

  @Field(() => [String], { nullable: true })
  select?: string[];
}
