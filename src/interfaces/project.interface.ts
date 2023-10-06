import { Document, Types } from 'mongoose';
import { Task } from 'src/schemes/task.scheme';

export interface IProject extends Document {
  name: string;
  description: string;
  tasks: Task[];
  creationTime: number;
}