import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards, UseInterceptors } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { ApiOperationResponse } from 'src/interfaces/api-operation-response.interface';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id/parse-object-id.pipe';
import { IProject } from 'src/interfaces/project.interface';
import { TaskDeleteCascadeInterceptor } from 'src/interceptors/task-delete-cascade/task-delete-cascade.interceptor';
import { TaskUpdateCascadeInterceptor } from 'src/interceptors/task-update-cascade/task-update-cascade.interceptor';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  create(@Body() project: CreateProjectDto): Promise<ApiOperationResponse<IProject>> {
    return this.projectsService.create(project);
  }

  @Get()
  getAll(): Promise<IProject[]> {
    return this.projectsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseObjectIdPipe) id: string): Promise<IProject> {
    return this.projectsService.getById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() project: UpdateProjectDto): Promise<ApiOperationResponse<IProject>> {
    return this.projectsService.update(id, project);
  }

  @UseInterceptors(TaskUpdateCascadeInterceptor)
  @Patch(':id/assign/:taskId')
  assignTask(
    @Param('id', ParseObjectIdPipe) id: string, 
    @Param('taskId', ParseObjectIdPipe) taskId: string
  ): Promise<ApiOperationResponse<IProject>> {
    return this.projectsService.assignTask(id, taskId);
  }

  @UseInterceptors(TaskUpdateCascadeInterceptor)
  @Patch(':id/unassign/:taskId')
  unassignTask(
    @Param('id', ParseObjectIdPipe) id: string, 
    @Param('taskId', ParseObjectIdPipe) taskId: string
  ): Promise<ApiOperationResponse<IProject>> {
    return this.projectsService.unassignTask(id, taskId);
  }

  @UseInterceptors(TaskDeleteCascadeInterceptor)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: string): Promise<ApiOperationResponse<IProject>> {
    return this.projectsService.delete(id);
  }
}
