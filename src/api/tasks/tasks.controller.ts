import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.tasksService.getById(id);
  }

  @Get()
  getAll(): Promise<any[]> {
    return this.tasksService.getAll();
  }

  @Post()
  create(@Body() task: any): Promise<any> {
    return this.tasksService.create(task);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.tasksService.delete(id);
  }

}
