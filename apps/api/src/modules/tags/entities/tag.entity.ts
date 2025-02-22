import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Post])
  posts: Post[];
}
