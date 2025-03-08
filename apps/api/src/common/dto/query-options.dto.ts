import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  skip?: number = 0;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  @IsInt()
  @Min(1)
  @IsOptional()
  take?: number = 10;
}

@InputType()
export class SortInput {
  @Field(() => String)
  @IsString()
  field: string;

  @Field(() => String, { defaultValue: 'asc' })
  @IsString()
  @IsOptional()
  direction?: 'asc' | 'desc' = 'asc';
}

@InputType()
export class FilterInput {
  @Field(() => String)
  @IsString()
  field: string;

  @Field(() => String)
  @IsString()
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
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationInput)
  pagination?: PaginationInput;

  @Field(() => [SortInput], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SortInput)
  sort?: SortInput[];

  @Field(() => [FilterInput], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterInput)
  filters?: FilterInput[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  include?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  select?: string[];
}
