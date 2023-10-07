import { Document } from 'mongoose';

import { Project } from 'src/schemes/project.scheme';

export interface ITask extends Document {
  name: string;
  description: string;
  status: string;
  project: Project;
  creationTime: number;
}