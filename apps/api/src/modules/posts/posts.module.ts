import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { CommonModule } from '../../common/common.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [CommonModule, PrismaModule],
  providers: [PostsResolver, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
