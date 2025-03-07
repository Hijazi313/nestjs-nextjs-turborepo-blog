import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { PrismaService } from '../../prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IAuthJwtPayload } from './types/auth.types';
import { LoginEntity } from './entities/login.entity';
// import { User } from '../users/entities/user.entity';
import { CreateUserInput } from '../users/dto/create-user.input';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(user: User): Promise<LoginEntity> {
    // const user = await this.validateLocalUser({ email, password });
    const accessToken = await this.generateJwt({
      userId: user.id,
      email: user.email,
    });
    return { access_token: accessToken, ...user };
  }

  async validateJwtUser(id: User['id']) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isValid = await verify(user.password, password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async validateGoogleUser(googleUser: CreateUserInput) {
    const user = await this.prismaService.user.findUnique({
      where: { email: googleUser.email },
    });
    if (user) {
      const { password, ...authUser } = user;
      return authUser;
    }

    const dbUser = await this.prismaService.user.create({
      data: { ...googleUser },
    });
    const { password, ...authUser } = dbUser;
    return authUser;
  }
  private async generateJwt(payload: IAuthJwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
