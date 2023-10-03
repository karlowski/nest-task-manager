import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  name: string;
  
  @IsString()
  description: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  status: string;

  project: string;
}