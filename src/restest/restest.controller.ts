import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestestService } from './restest.service';
import { CreateRestestDto } from './dto/create-restest.dto';
import { UpdateRestestDto } from './dto/update-restest.dto';

@Controller('restest')
export class RestestController {
  constructor(private readonly restestService: RestestService) {}

  @Post()
  create(@Body() createRestestDto: CreateRestestDto) {
    return this.restestService.create(createRestestDto);
  }

  @Get()
  findAll() {
    return this.restestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestestDto: UpdateRestestDto) {
    return this.restestService.update(+id, updateRestestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restestService.remove(+id);
  }
}
