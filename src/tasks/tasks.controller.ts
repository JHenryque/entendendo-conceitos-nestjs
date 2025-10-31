import { Controller, Get, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAllTasks(@Query('limit') limit: string) {
    console.log(limit);
    return this.tasksService.findAll();
  }

  @Get(':id')
  findTaskById(@Param('id') id: number) {
    console.log(id);
    return this.tasksService.findById(id);
  }
}
