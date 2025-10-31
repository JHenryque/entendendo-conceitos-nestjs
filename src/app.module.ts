import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { RestestModule } from './restest/restest.module';

@Module({
  imports: [UsersModule, TasksModule, RestestModule],
  controllers: [AppController, TasksController],
  providers: [AppService],
})
export class AppModule {}
