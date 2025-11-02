import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
