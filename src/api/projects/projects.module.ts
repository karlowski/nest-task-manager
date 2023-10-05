import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectSchema } from 'src/schemes/project.scheme';
import { TaskSchema } from 'src/schemes/task.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema },
      { name: 'Task', schema: TaskSchema }
    ])
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
