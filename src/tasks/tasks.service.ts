import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from 'src/entities/tasks.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'First Task',
      cargo: 'Developer',
      description: 'This is the first task',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Second Task',
      cargo: 'Developer',
      description: 'This is the second task',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  findAll() {
    return this.tasks;
  }

  findById(id: string) {
    const task = this.tasks.find((task) => task.id === Number(id));

    if (task) return task;

    throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
    //throw new NotFoundException('Task not found');
  }

  createTask(body: any) {
    const newId = this.tasks.length > 0 ? this.tasks.length + 1 : 1;

    if (newId)
      throw new HttpException('Essa tarefa não existe', HttpStatus.BAD_REQUEST);

    const newTask: Task = {
      id: newId,
      ...body,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  delete(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== Number(id));
    return { deleted: true };
  }

  update(id: string, body: any) {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0)
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);

    if (taskIndex > 0) {
      const taskUpdated = this.tasks[taskIndex];
      console.log(taskUpdated);

      this.tasks[taskIndex] = {
        ...taskUpdated,
        ...body,
      };
      //console.log(this.tasks);
    }

    return 'Task updated successfully';
  }
}
