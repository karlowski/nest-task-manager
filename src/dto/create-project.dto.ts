import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { CreateTaskDto } from "./create-task.dto";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  name: string;
  
  @IsString()
  description: string;

  // tasks: CreateTaskDto[];
  tasks: string[];
}