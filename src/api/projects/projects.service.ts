import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  async getById(id: number): Promise<any> {
    return { id };
  }

  async getAll(): Promise<any[]> {
    return [];
  }

  async create(project: any): Promise<any> {
    return { ...project };
  }

  async delete(id: number): Promise<any> {
    return null;
  }
}
