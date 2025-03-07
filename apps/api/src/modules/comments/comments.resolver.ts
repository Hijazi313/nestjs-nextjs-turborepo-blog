import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment, { name: 'createComment' })
  @UseGuards(JwtAuthGuard)
  createComment(
    @Context() context,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    const authorId = context.req.user.id;
    return this.commentsService.create(createCommentInput, authorId);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll(
    @Args('take', { type: () => Int, nullable: true, defaultValue: 12 })
    take: number,
    @Args('skip', { type: () => Int, nullable: true, defaultValue: 0 })
    skip: number,
  ) {
    return this.commentsService.findAll({ take, skip });
  }

  @Query(() => [Comment], { name: 'commentsByPost' })
  commentsByPost(
    @Args('postId', { type: () => Int! }) postId: number,
    @Args('take', { type: () => Int, nullable: true, defaultValue: 12 })
    take: number,
    @Args('skip', { type: () => Int, nullable: true, defaultValue: 0 })
    skip: number,
  ) {
    return this.commentsService.findAllCommentsByPost({ postId, take, skip });
  }

  @Query(() => Int, { name: 'commentsCount' })
  commentsCount(@Args('postId', { type: () => Int! }) postId: number) {
    return this.commentsService.commentsCount(postId);
  }
  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.remove(id);
  }
}
