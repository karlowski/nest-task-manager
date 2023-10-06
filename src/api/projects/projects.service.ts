import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProjectDto } from 'src/dto/create-project.dto';
import { UpdateProjectDto } from 'src/dto/update-project.dto';
import { EntityNotFound } from 'src/exceptions/entity-not-found.exception';
import { ApiOperationResponse } from 'src/interfaces/api-operation-response.interface';
import { IProject } from 'src/interfaces/project.interface';

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

    const updatedProjectResponse = await this.projectModel.updateOne({ _id: id }, project);

    return { 
      message: 'Project created successfully',
      data: {
        id,
        name: existingProject.name,
        description: existingProject.description,
        tasks: existingProject.tasks,
        ...project
      } as IProject
    };
  }

  async delete(id: string): Promise<ApiOperationResponse<IProject>> {
    const existingProject = await this.projectModel.findById(id);

    if (!existingProject) throw new EntityNotFound();

    const deletedProjectResponse = await this.projectModel.deleteOne({ _id: id });

    return { 
      message: 'Project deleted successfully',
      data: existingProject
    };
  }
}
