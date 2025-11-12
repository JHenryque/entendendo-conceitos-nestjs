/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/param/token.param';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { randomUUID } from 'node:crypto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  findByIdUser(@Param('id', ParseIntPipe) id: number) {
    console.log('Token teste:', process.env.TOKEN_KEY);
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.userService.update(id, updateUserDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.userService.delete(id, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  //@UseInterceptors(FileInterceptor('file')) para 1 upload
  @UseInterceptors(FilesInterceptor('file'))
  @Post('upload')
  async uploadAvatar(
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
    //@UploadedFile() file: Express.Multer.File, para 1 upload
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    files.forEach(async (file) => {
      const fileExtension = path
        .extname(file.originalname)
        .toLowerCase()
        .substring(1);
      const fileName = `${randomUUID()}.${fileExtension}`;
      const fileLocale = path.resolve(process.cwd(), 'files', fileName);

      await fs.promises.writeFile(fileLocale, file.buffer);
    });

    // //const mimeType = file.mimetype;
    // const fileExtision = path
    //   .extname(file.originalname)
    //   .toLocaleLowerCase()
    //   .substring(1);
    // // randomUUID() ou
    // const fileName = `${tokenPayload.sub}.${fileExtision}`;
    // const fileLocale = path.resolve(process.cwd(), 'files', fileName);
    // await fs.promises.writeFile(fileLocale, file.buffer);

    return true;
  }
}
