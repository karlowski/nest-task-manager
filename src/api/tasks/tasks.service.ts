import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ITask } from 'src/interfaces/task.interface';
import { EntityNotFound } from 'src/exceptions/entity-not-found.exception';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { TaskOperation } from 'src/interfaces/task-operation.interface';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { TaskResponse } from 'src/interfaces/task-response.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task')
    private taskModel: Model<ITask>
  ) {}

  async getById(id: string): Promise<ITask> {
    const task = await this.taskModel.findById(id);

    if (!task) throw new EntityNotFound(); 

    return task;
  }

  async getAll(): Promise<ITask[]> {
    return this.taskModel.find();
  }

  async create(task: CreateTaskDto): Promise<TaskOperation<TaskResponse>> {
    const { _id, name, description, status, project, creationTime } = await this.taskModel.create({ ...task, creationTime: Date.now() });

    return { 
      message: 'Task created successfully',
      data: { id: _id, name, description, status, project, creationTime }
    };
  }

  async update(id: string, taskDetails: UpdateTaskDto): Promise<TaskOperation<TaskResponse>> {
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
      }
    };
  }

  async delete(id: string): Promise<TaskOperation<TaskResponse>> {
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
      }
    };
  }
}
