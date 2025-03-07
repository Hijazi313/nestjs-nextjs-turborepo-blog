import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @IsString()
  content: string;

  @Field(() => Int)
  @IsNumber()
  postId: number;
}
