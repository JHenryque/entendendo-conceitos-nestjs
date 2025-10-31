import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ola')
  getOla(): string {
    return this.appService.getOla();
  }

  @Post('/ola')
  postOla(): string {
    return 'Olá via POST!';
  }
}
