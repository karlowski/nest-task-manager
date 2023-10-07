import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProjectDto } from 'src/dto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { EntityNotFound } from 'src/exceptions/entity-not-found.exception';
import { ApiOperationResponse } from 'src/interfaces/api-operation-response.interface';
import { IProject } from 'src/interfaces/project.interface';
import { Task } from 'src/schemes/task.scheme';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project')
    private projectModel: Model<IProject>
  ) {}
  
  async create({ name, description, tasks }: CreateProjectDto): Promise<ApiOperationResponse<IProject>> {
    const existingProject = await this.projectModel.findOne({ name });

    if (existingProject) throw new BadRequestException({ message: 'Project with such name already exists' });

    const createdProject = await this.projectModel.create({ name, description, tasks: tasks || [] });

    return { 
      message: 'Project created successfully',
      data: createdProject
    };
  }

  async getAll(): Promise<IProject[]> {
    return this.projectModel.find().populate('tasks');
  }

  async getById(id: string): Promise<IProject> {
    const project = await this.projectModel.findById(id).populate('tasks');

    if (!project) throw new EntityNotFound();

    return project;
  }

  async update(id: string, project: UpdateProjectDto): Promise<ApiOperationResponse<IProject>> {
    const existingProject = await this.projectModel.findById(id);

    if (!existingProject) throw new EntityNotFound();

    const updatedProject = await this.projectModel.findByIdAndUpdate(id, project);

    return { 
      message: 'Project updated successfully',
      data: updatedProject
    };
  }

  async assignTask(id: string, taskId: string,): Promise<ApiOperationResponse<IProject>> {
    const existingProject = await this.projectModel.findById(id);

    if (!existingProject) throw new EntityNotFound();

    const taskAlreadyAssigned = existingProject.tasks.find((task) => task._id.toString() === taskId);

    if (taskAlreadyAssigned) throw new BadRequestException({ message: 'Task already assigned to this project' });

    const updatedTasks = [...existingProject.tasks, { _id: taskId }];
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, { tasks: updatedTasks });

    updatedProject.tasks = updatedTasks as Task[];

    return { 
      message: 'Project updated successfully',
      data: updatedProject
    };
  }

  async unassignTask(id: string, taskId: string,): Promise<ApiOperationResponse<IProject>> {
    const existingProject = await this.projectModel.findById(id);

    if (!existingProject) throw new EntityNotFound();

    const taskAssigned = existingProject.tasks.find((task) => task._id.toString() === taskId);

    if (!taskAssigned) throw new BadRequestException({ message: 'No such task assigned to this project' });

    const updatedTasks = existingProject.tasks.filter((task) => task._id.toString() !== taskId);
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, { tasks: updatedTasks });

    updatedProject.tasks = updatedTasks;

    return { 
      message: 'Project updated successfully',
      data: updatedProject
    };
  }

  async delete(id: string): Promise<ApiOperationResponse<IProject>> {
    const existingProject = await this.projectModel.findById(id);

    if (!existingProject) throw new EntityNotFound();

    const deletedProject = await this.projectModel.findByIdAndDelete(id);

    return { 
      message: 'Project deleted successfully',
      data: deletedProject
    };
  }
}
