import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ITask } from 'src/interfaces/task.interface';
import { EntityNotFound } from 'src/exceptions/entity-not-found.exception';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { ApiOperationResponse } from 'src/interfaces/api-operation-response.interface';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task')
    private taskModel: Model<ITask>
  ) {}

  async create(task: CreateTaskDto): Promise<ApiOperationResponse<ITask>> {
    const existingTask = await this.taskModel.findOne({ name: task.name });

    if (existingTask) throw new BadRequestException({ message: 'Task with such name already exists' });

    const createdTask = await this.taskModel.create({ 
      ...task, 
      project: task.project || null,
      creationTime: Date.now() 
    });

    return { 
      message: 'Task created successfully',
      data: createdTask
    };
  }

  async getAll(): Promise<ITask[]> {
    return this.taskModel.find().populate({ path: 'project', select: 'name description' });
  }

  async getById(id: string): Promise<ITask> {
    const task = await this.taskModel.findById(id).populate({ path: 'project', select: 'name description' });

    if (!task) throw new EntityNotFound(); 

    return task;
  }

  async update(id: string, taskDetails: UpdateTaskDto): Promise<ApiOperationResponse<ITask>> {
    const task = await this.taskModel.findById(id);

    if (!task) throw new EntityNotFound();

    const updatedTask = await this.taskModel.findByIdAndUpdate(id, taskDetails);

    return { 
      message: 'Task updated successfully',
      data: updatedTask
    };
  }

  async delete(id: string): Promise<ApiOperationResponse<ITask>> {
    const task = await this.taskModel.findById(id);

    if (!task) throw new EntityNotFound();
    
    const deletedTask = await this.taskModel.findByIdAndDelete(id);

    return { 
      message: 'Task deleted successfully',
      data: deletedTask
    };
  }
}
