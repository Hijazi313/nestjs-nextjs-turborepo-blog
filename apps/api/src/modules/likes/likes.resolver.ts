import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './entities/like.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  likePost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<boolean> {
    const userId = context.req.user.id as number;
    return this.likesService.like({
      userId,
      postId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  unlikePost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
  ): Promise<boolean> {
    const userId = context.req.user.id as number;
    return this.likesService.unlike({
      userId,
      postId,
    });
  }

  @Query(() => Int)
  postLikesCount(
    @Args('postId', { type: () => Int! }) postId: number,
  ): Promise<number> {
    return this.likesService.getLikesCountByPostId(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  userLikedPost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
  ): Promise<boolean> {
    const userId = context.req.user.id as number;
    return this.likesService.userLikedPost(userId, postId);
  }
}
