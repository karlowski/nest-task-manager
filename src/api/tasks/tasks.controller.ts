import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { ITask } from 'src/interfaces/task.interface';
import { ApiOperation } from 'src/interfaces/api-operation.interface';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { TaskResponse } from 'src/interfaces/task-response.interface';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  getById(@Param('id') id: string): Promise<ITask> {
    return this.tasksService.getById(id);
  }

  @Get()
  getAll(): Promise<ITask[]> {
    return this.tasksService.getAll();
  }

  @Post()
  create(@Body() task: CreateTaskDto): Promise<ApiOperation<TaskResponse>> {
    return this.tasksService.create(task);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() task: UpdateTaskDto): Promise<ApiOperation<TaskResponse>> {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ApiOperation<TaskResponse>> {
    return this.tasksService.delete(id);
  }

}
