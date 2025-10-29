import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Olá Mundo!';
  }

  getOla(): string {
    return 'Olá do NestJS!';
  }
}
