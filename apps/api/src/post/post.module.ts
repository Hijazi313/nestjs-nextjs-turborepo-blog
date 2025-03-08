import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
