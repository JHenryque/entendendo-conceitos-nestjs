import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  private tasks: Task[] = [
    {
      id: 1,
      name: 'First Task',
      cargo: 'Developer',
      description: 'This is the first task',
      isCompleted: false,
    },
    {
      id: 2,
      name: 'Second Task',
      cargo: 'Developer',
      description: 'This is the second task',
      isCompleted: false,
    },
  ];
  async findAll() {
    const allTasks = await this.prisma.task.findMany();
    console.log(allTasks);
    return allTasks;
  }

  async findById(id: string) {
    //const task = this.tasks.find((task) => task.id === Number(id));

    const task = await this.prisma.task.findFirst({
      where: { id: Number(id) },
    });

    if (task?.name) return task;

    throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);
    //throw new NotFoundException('Task not found');
  }

  createTask(createTaskDto: CreateTaskDto) {
    const newId = this.tasks.length > 0 ? this.tasks.length + 1 : 1;

    if (!newId)
      throw new HttpException('Essa tarefa não existe', HttpStatus.BAD_REQUEST);

    const newTask: Task = {
      id: newId,
      ...createTaskDto,
      isCompleted: true,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  delete(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0)
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);

    //this.tasks = this.tasks.filter((task) => task.id !== Number(id));

    this.tasks.splice(taskIndex, 1);

    return { deleted: 'Tarefa esxluida com sucesso' };
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0)
      throw new HttpException('Essa tarefa não existe', HttpStatus.NOT_FOUND);

    if (taskIndex > 0) {
      const taskUpdated = this.tasks[taskIndex];
      console.log(taskUpdated);

      this.tasks[taskIndex] = {
        ...taskUpdated,
        ...updateTaskDto,
      };
      //console.log(this.tasks);
    }

    return 'Task updated successfully';
  }
}
