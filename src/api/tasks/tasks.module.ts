import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskSchema } from 'src/schemes/task.scheme';
import { ProjectSchema } from 'src/schemes/project.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
      { name: 'Project', schema: ProjectSchema }
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
