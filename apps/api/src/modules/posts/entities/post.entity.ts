import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Tag } from '../../tags/entities/tag.entity';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  thumbnail?: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => [Tag])
  tags: Promise<Tag[]>;

  @Field(() => User)
  author: Promise<User>;

  @Field(() => [Comment])
  comments: Promise<Comment[]>;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
