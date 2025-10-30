import { Module } from '@nestjs/common';
import { TesksController } from './tesks.controller';
import { TesksService } from './tesks.service';

@Module({
  controllers: [TesksController],
  providers: [TesksService],
})
export class TesksModule {}
