import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginEntity {
  @Field()
  access_token: string;

  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;
}
