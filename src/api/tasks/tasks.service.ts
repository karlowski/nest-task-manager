import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ITask } from 'src/interfaces/task.interface';
import { EntityNotFound } from 'src/exceptions/entity-not-found.exception';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { ApiOperationResponse } from 'src/interfaces/api-operation-response.interface';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { TaskResponse } from 'src/interfaces/task-response.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task')
    private taskModel: Model<ITask>
  ) {}

  async create(task: CreateTaskDto): Promise<ApiOperationResponse<ITask>> {
    const createdTask = await this.taskModel.create({ ...task, creationTime: Date.now() });

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

    const updatedTaskResponse = await this.taskModel.updateOne({ _id: id }, taskDetails);

    return { 
      message: 'Task updated successfully',
      data: { 
        id: task._id,
        name: task.name,
        description: task.description,
        status: task.status,
        project: task.project,
        creationTime: task.creationTime,
        ...taskDetails 
      } as ITask
    };
  }

  async delete(id: string): Promise<ApiOperationResponse<ITask>> {
    const task = await this.taskModel.findById(id);

    if (!task) throw new EntityNotFound();
    
    const deletedTaskResponse = await this.taskModel.deleteOne({ _id: id });

    return { 
      message: 'Task deleted successfully',
      data: { 
        id: task._id,
        name: task.name,
        description: task.description,
        status: task.status,
        project: task.project,
        creationTime: task.creationTime
      } as ITask
    };
  }
}
