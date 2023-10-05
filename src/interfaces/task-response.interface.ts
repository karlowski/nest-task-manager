import { Types } from "mongoose";
import { Project } from "src/schemes/project.scheme";

export interface TaskResponse {
  name: string;
  description?: string;
  status: string;
  project?: string | Project;
  id: Types.ObjectId;
  creationTime: number;
}