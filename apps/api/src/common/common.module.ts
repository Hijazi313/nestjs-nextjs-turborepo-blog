import { Module } from '@nestjs/common';
import { QueryBuilderService } from './services/query-builder.service';
import { BaseService } from './services/base.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [QueryBuilderService, BaseService, PrismaService],
  exports: [QueryBuilderService, BaseService],
})
export class CommonModule {}
