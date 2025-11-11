import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/param/token.param';
import { PayloadTokenDto } from 'src/auth/dto/payload-token.dto';
// import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
// import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
// import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
// import { AuthAdminGuard } from 'src/common/guards/admin.guard';

@Controller('tasks')
// @UseInterceptors(LoggerInterceptor)
// @UseGuards(AuthAdminGuard)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    // @Inject('KEY_TOKEN')
    // private readonly keyToken: string,
  ) {}

  @Get()
  // @UseInterceptors(AddHeaderInterceptor)
  findAllTasks(@Query() paginationDto: PaginationDto) {
    // console.log(this.keyToken);
    return this.tasksService.findAll(paginationDto);
  }

  @Get(':id')
  findTaskById(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    return this.tasksService.findById(id);
  }

  @UseGuards(AuthTokenGuard)
  @Post()
  // @UseInterceptors(BodyCreateTaskInterceptor)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.tasksService.createTask(createTaskDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.tasksService.update(id, updateTaskDto, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  deleteTask(
    @Param('id', ParseIntPipe) id: string,
    @TokenPayloadParam() tokenPayload: PayloadTokenDto,
  ) {
    return this.tasksService.delete(id, tokenPayload);
  }
}
