import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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

  @Post()
  createTask(@Body() body: any) {
    console.log(body);
    return this.tasksService.createTask(body);
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() body: any) {
    console.log('ID:', id, 'Body:', body);
    return `Atualizando a task #${id}`;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    console.log('ID:', id);
    return `Deletando a task #${id}`;
  }
}
