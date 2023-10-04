import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskSchema } from 'src/schemes/task.scheme';
import { ObjectIdParserMiddleware } from 'src/middlewares/object-id-parser.middleware';
import { ProjectSchema } from 'src/schemes/project.scheme';
import { TaskStatusParserMiddleware } from 'src/middlewares/task-status-parser.middleware';

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
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ObjectIdParserMiddleware).forRoutes('tasks/:id')
      .apply(TaskStatusParserMiddleware).forRoutes('tasks/:id/status');
  }
}
