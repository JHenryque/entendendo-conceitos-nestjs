import { Controller, Get } from '@nestjs/common';
import { TesksService } from './tesks.service';

@Controller()
export class TesksController {
  constructor(private readonly tesksService: TesksService) {}

  @Get('/tesks')
  getAllTesks() {
    return this.tesksService.getAllTesks();
  }
}
