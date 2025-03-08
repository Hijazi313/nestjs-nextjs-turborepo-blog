import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryBuilderService } from '../../common/services/query-builder.service';
import { TypedBaseService } from '../../common/services/typed-base.service';

/**
 * Service for managing users with type-safe operations
 */
@Injectable()
export class UserService extends TypedBaseService<
  User,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  'user'
> {
  protected readonly modelName = 'user';

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly queryBuilder: QueryBuilderService,
  ) {
    super(prisma, queryBuilder);
  }

  /**
   * Find a user by email
   * @param email The email to search for
   * @returns The found user or null
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Custom method to create a user with hashed password
   * @param data User data with plain password
   * @returns The created user
   */
  async createWithHashedPassword(
    data: Omit<Prisma.UserCreateInput, 'password'> & { password: string },
  ): Promise<User> {
    // In a real application, you would hash the password here
    const hashedPassword = `hashed_${data.password}`;

    return this.createOne({
      ...data,
      password: hashedPassword,
    });
  }
}
