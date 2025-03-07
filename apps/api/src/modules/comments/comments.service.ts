import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCommentInput: CreateCommentInput, authorId: number) {
    return this.prismaService.comment.create({
      data: {
        content: createCommentInput.content,
        post: {
          connect: {
            id: createCommentInput.postId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }

  findAll({ take, skip }: { take: number; skip: number }) {
    return this.prismaService.comment.findMany({
      take,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.comment.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return this.prismaService.comment.update({
      where: { id },
      data: updateCommentInput,
    });
  }

  remove(id: number) {
    return this.prismaService.comment.delete({
      where: { id },
    });
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
