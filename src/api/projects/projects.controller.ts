import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.projectsService.getById(id);
  }

  @Get()
  getAll(): Promise<any[]> {
    return this.projectsService.getAll();
  }

  @Post()
  create(@Body() task: any): Promise<any> {
    return this.projectsService.create(task);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.projectsService.delete(id);
  }
}
