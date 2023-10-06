import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { ApiOperationResponse } from 'src/interfaces/api-operation-response.interface';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id/parse-object-id.pipe';
import { IProject } from 'src/interfaces/project.interface';

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

  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: string): Promise<ApiOperationResponse<IProject>> {
    return this.projectsService.delete(id);
  }
}
