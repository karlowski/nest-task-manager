import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  async getById(id: number): Promise<any> {
    return { id };
  }

  async getAll(): Promise<any[]> {
    return [];
  }

  async create(task: any): Promise<any> {
    return { ...task };
  }

  async delete(id: number): Promise<any> {
    return null;
  }
}
