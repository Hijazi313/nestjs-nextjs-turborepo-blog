import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '@prisma/client';
import { QueryOptionsInput } from '../../common/dto/query-options.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() options: QueryOptionsInput): Promise<User[]> {
    return this.userService.findAll(options);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query() options: QueryOptionsInput,
  ): Promise<User | null> {
    return this.userService.findOneFirst(id, options);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createWithHashedPassword(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // If password is provided, hash it
    if (updateUserDto.password) {
      const hashedPassword = `hashed_${updateUserDto.password}`;
      return this.userService.updateOne(id, {
        ...updateUserDto,
        password: hashedPassword,
      });
    }

    return this.userService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteOne(id);
  }
}
