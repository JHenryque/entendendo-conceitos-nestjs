import { Injectable } from '@nestjs/common';
import { CreateRestestDto } from './dto/create-restest.dto';
import { UpdateRestestDto } from './dto/update-restest.dto';

@Injectable()
export class RestestService {
  create(createRestestDto: CreateRestestDto) {
    return 'This action adds a new restest';
  }

  findAll() {
    return `This action returns all restest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restest`;
  }

  update(id: number, updateRestestDto: UpdateRestestDto) {
    return `This action updates a #${id} restest`;
  }

  remove(id: number) {
    return `This action removes a #${id} restest`;
  }
}
