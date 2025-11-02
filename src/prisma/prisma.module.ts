import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient } from 'src/generated/client/client';

@Module({
  imports: [PrismaClient],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
