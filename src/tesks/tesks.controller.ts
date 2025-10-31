import { Controller, Get } from '@nestjs/common';
import { TesksService } from './tesks.service';

@Controller('/tesks')
export class TesksController {
  constructor(private readonly tesksService: TesksService) {}

  @Get()
  getAllTesks() {
    return this.tesksService.getAllTesks();
  }

  @Get('/all')
  getAllTesks2() {
    return this.tesksService.getAllTesks2();
  }
}
