import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Type } from "class-transformer";

import { Project } from "./project.scheme";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Project;
}

export const TaskSchema = SchemaFactory.createForClass(Task);