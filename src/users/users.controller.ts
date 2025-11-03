import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':id')
  findAll() {
    return 'This action returns all users';
  }
}
