import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { QueryOptionsInput } from '../../common/dto/query-options.dto';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  createPost(
    @Context() context,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    const user = context.req.user;
    return this.postsService.createPost(createPostInput, user.id);
  }
  // @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Context() context,
    @Args('options', { nullable: true }) options?: QueryOptionsInput,
  ) {
    return this.postsService.findAll(options || {});
  }

  @Query(() => Int, { name: 'postCount' })
  postCount(@Args('options', { nullable: true }) options?: QueryOptionsInput) {
    return this.postsService.postCount(options || {});
  }

  @Query(() => Post, { name: 'post' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Args('options', { nullable: true }) options?: QueryOptionsInput,
  ) {
    return this.postsService.findOneById(id, options || {});
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.updatePost(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.removePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'myPosts' })
  myPosts(
    @Context() context,
    @Args('options', { nullable: true }) options?: QueryOptionsInput,
  ) {
    const user = context.req.user;
    return this.postsService.userPosts(user.id, options || {});
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int, { name: 'myPostsCount' })
  myPostsCount(
    @Context() context,
    @Args('options', { nullable: true }) options?: QueryOptionsInput,
  ) {
    const user = context.req.user;
    return this.postsService.userPostsCount(user.id, options || {});
  }
}
