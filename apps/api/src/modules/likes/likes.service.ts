import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}
  async like({ userId, postId }: { userId: number; postId: number }) {
    try {
      const like = await this.prisma.like.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
      // const like2 = await this.prisma.like.create({
      //   data: {
      //     userId,
      //     postId,
      //   },
      // });
      return !!like;
    } catch (error) {
      throw new BadRequestException('You already liked this post');
    }
  }

  async unlike({ userId, postId }: { userId: number; postId: number }) {
    try {
      // First find if the like exists
      const existingLike = await this.prisma.like.findFirst({
        where: {
          userId: userId,
          postId: postId,
        },
      });

      // If like doesn't exist, return false
      if (!existingLike) {
        throw new BadRequestException('You have not liked this post');
      }

      // Delete the like using its ID
      await this.prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return true;
    } catch (error) {
      throw new BadRequestException('Error unliking post');
    }
  }

  async getLikesCountByPostId(postId: number): Promise<number> {
    const likes = await this.prisma.like.count({
      where: {
        postId,
      },
    });
    return likes;
  }

  async userLikedPost(userId: number, postId: number): Promise<boolean> {
    const like = await this.prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    return !!like;
  }
}
