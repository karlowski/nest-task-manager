import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { ITask } from 'src/interfaces/task.interface';
import { ApiOperationResponse } from 'src/interfaces/api-operation-response.interface';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id/parse-object-id.pipe';
import { ParseTaskStatusPipe } from 'src/pipes/parse-task-status/parse-task-status.pipe';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() task: CreateTaskDto): Promise<ApiOperationResponse<ITask>> {
    return this.tasksService.create(task);
  }

  @Get()
  getAll(): Promise<ITask[]> {
    return this.tasksService.getAll();
  }
  
  @Get(':id')
  getById(@Param('id', ParseObjectIdPipe) id: string): Promise<ITask> {
    return this.tasksService.getById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() task: UpdateTaskDto): Promise<ApiOperationResponse<ITask>> {
    return this.tasksService.update(id, task);
  }

  @Patch(':id/status')
  changeStatus(
    @Param('id', ParseObjectIdPipe) id: string, 
    @Body(ParseTaskStatusPipe) { status }: Record<string, string>
  ): Promise<ApiOperationResponse<ITask>> {
    return this.tasksService.update(id, { status });
  }

  @Patch(':id/assign/:projectId')
  assignToProject(
    @Param('id', ParseObjectIdPipe) id: string, 
    @Param('projectId', ParseObjectIdPipe) projectId: string
  ): Promise<ApiOperationResponse<ITask>> {
    return this.tasksService.update(id, { project: projectId });
  }

  @Patch(':id/unassign')
  UnassignFromProject(@Param('id', ParseObjectIdPipe) id: string): Promise<ApiOperationResponse<ITask>> {
    return this.tasksService.update(id, { project: null });
  }

  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: string): Promise<ApiOperationResponse<ITask>> {
    return this.tasksService.delete(id);
  }

}
