import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { ApiOperation } from 'src/interfaces/api-operation.interface';
import { UpdateProjectDto } from 'src/dto/update-project.dto';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  create(@Body() project: CreateProjectDto): Promise<ApiOperation<any>> {
    return this.projectsService.create(project);
  }

  @Get()
  getAll(): Promise<any[]> {
    return this.projectsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<ApiOperation<any>> {
    return this.projectsService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() project: UpdateProjectDto): Promise<ApiOperation<any>> {
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<ApiOperation<any>> {
    return this.projectsService.delete(id);
  }
}
