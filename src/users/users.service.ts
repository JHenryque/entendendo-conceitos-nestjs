import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: { id: true, name: true, email: true },
    });
    if (user) return user;

    throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return user;
    } catch (err) {
      console.log(err);
      throw new HttpException('Fala ao cadastrar', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      const userUpdate = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          name: updateUserDto.name ? updateUserDto.name : user.name,
          email: updateUserDto.email ? updateUserDto.email : user.email,
          password: updateUserDto.password
            ? updateUserDto.password
            : user.password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return userUpdate;
    } catch (err) {
      console.log(err);
      throw new HttpException('Fala ao update', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      const userDelete = await this.prisma.user.delete({
        where: { id: user.id },
      });

      return userDelete;
    } catch (err) {
      console.log(err);
      throw new HttpException('Fala ao deletar', HttpStatus.BAD_REQUEST);
    }
  }
}
