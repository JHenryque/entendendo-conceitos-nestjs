import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly decrypt: HashingServiceProtocol,
  ) {}
  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: { id: true, name: true, email: true, Task: true },
    });
    if (user) return user;

    throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const passwordHash = await this.decrypt.hash(createUserDto.password);

      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: passwordHash,
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

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    tokenPayload: PayloadTokenDto,
  ) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      if (user.id !== tokenPayload.sub)
        throw new HttpException('Acesso negado', HttpStatus.BAD_REQUEST);

      const dataUser: {
        name?: string;
        password?: string;
      } = {
        name: updateUserDto.name ? updateUserDto.name : user.name,
      };

      if (updateUserDto?.password) {
        const passwordHash = await this.decrypt.hash(updateUserDto?.password);
        dataUser['password'] = passwordHash;
      }

      const userUpdate = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          name: updateUserDto.name,
          password: dataUser?.password ? dataUser.password : user.password,
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

  async delete(id: number, tokenPayload: PayloadTokenDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
      });

      if (!user)
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      if (user.id !== tokenPayload.sub)
        throw new HttpException('Acesso negado', HttpStatus.BAD_REQUEST);

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
