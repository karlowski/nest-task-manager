import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import { Task } from "./task.scheme";

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop([{ type: Task, ref: Task.name }])
  tasks: Task[];

  @Prop()
  creationTime: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);