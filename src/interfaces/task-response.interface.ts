export interface TaskResponse {
  name: string;
  description?: string;
  status: string;
  project?: string;
  id: string;
  creationTime: number;
}