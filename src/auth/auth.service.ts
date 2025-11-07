import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly decrypt: HashingServiceProtocol,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    console.log(jwtConfiguration);
  }
  async authenticate(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
    });

    if (!user)
      throw new HttpException('Email e invalido', HttpStatus.UNAUTHORIZED);

    const passwordIsValid = await this.decrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!passwordIsValid)
      throw new HttpException('Senha e invalida', HttpStatus.UNAUTHORIZED);

    console.log('Logado com sucesso');
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
