import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCommentInput: CreateCommentInput) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  findAllCommentsByPost({
    postId,
    take,
    skip,
  }: {
    postId: number;
    take: number;
    skip: number;
  }) {
    return this.prismaService.comment.findMany({
      where: { postId },
      include: {
        author: true,
      },
      take,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async commentsCount(postId: number) {
    return this.prismaService.comment.count({
      where: {
        postId,
      },
    });
  }
}
