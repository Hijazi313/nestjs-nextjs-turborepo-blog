import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationParams } from '../../types/common';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createPostInput: CreatePostInput) {
    return 'This action adds a new post';
  }

  findAll({ skip, take }: PaginationParams = { skip: 0, take: 10 }) {
    return this.prismaService.post.findMany({
      skip,
      take,
    });
  }

  postCount() {
    return this.prismaService.post.count();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
