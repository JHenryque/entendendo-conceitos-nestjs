import { Module } from '@nestjs/common';
import { RestestService } from './restest.service';
import { RestestController } from './restest.controller';

@Module({
  controllers: [RestestController],
  providers: [RestestService],
})
export class RestestModule {}
