import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId, SchemaTypes, Types } from "mongoose";
import { Type } from "class-transformer";

import { Task, TaskSchema } from "./task.scheme";

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  // _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Task' }])
  tasks: Task[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);