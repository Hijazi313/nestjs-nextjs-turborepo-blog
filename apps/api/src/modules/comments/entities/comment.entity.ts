import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => Post)
  post: Post;

  @Field(() => User)
  author: User;

  @Field()
  createdAt: Date;
}
