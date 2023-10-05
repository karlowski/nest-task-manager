import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

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

  @Post()
  create(@Body() task: CreateTaskDto): Promise<ApiOperation<TaskResponse>> {
    return this.tasksService.create(task);
  }

  @Get()
  getAll(): Promise<ITask[]> {
    return this.tasksService.getAll();
  }
  
  @Get(':id')
  getById(@Param('id') id: string): Promise<ITask> {
    return this.tasksService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() task: UpdateTaskDto): Promise<ApiOperation<TaskResponse>> {
    return this.tasksService.update(id, task);
  }

  @Patch(':id/status')
  changeStatus(@Param('id') id: string, @Body() { status }: Record<string, string>): Promise<ApiOperation<TaskResponse>> {
    return this.tasksService.update(id, { status });
  }

  @Patch(':id/assign/:projectId')
  assignToProject(@Param('id') id: string, @Param('projectId') projectId: string): Promise<ApiOperation<TaskResponse>> {
    return this.tasksService.update(id, { project: projectId });
  }

  @Patch(':id/unassign')
  UnassignFromProject(@Param('id') id: string): Promise<ApiOperation<TaskResponse>> {
    return this.tasksService.update(id, { project: null });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ApiOperation<TaskResponse>> {
    return this.tasksService.delete(id);
  }

}
