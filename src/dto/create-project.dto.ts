import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { CreateTaskDto } from "./create-task.dto";
import { Types } from "mongoose";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  name: string;
  
  @IsString()
  description: string;

  // tasks: CreateTaskDto[];
  tasks: any[];
}