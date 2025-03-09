import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  thumbnail: string;

  @Field(() => Boolean, { nullable: true })
  published: boolean;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  title: string;
}
