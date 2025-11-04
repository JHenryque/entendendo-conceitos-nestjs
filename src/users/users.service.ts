import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//import { createUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user) return user;

    throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }
}
