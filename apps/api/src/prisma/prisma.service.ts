import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger();
  async onModuleInit() {
    await this.$connect();
    // an interactive db connector log
    this.logger.log('PrismaService connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
