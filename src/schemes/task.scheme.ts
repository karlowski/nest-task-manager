import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import { Project } from "./project.scheme";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Project;

  @Prop()
  creationTime: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);