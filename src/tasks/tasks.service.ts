import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  findAll(): string {
    return 'This action returns all tasks';
  }

  findById(id: number) {
    return `This action returns a specific task #${id} task`;
  }

  createTask(body: any) {
    console.log('Creating task with data:');
    return `${body} task has been created`;
  }
}
