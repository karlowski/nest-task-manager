import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskSchema } from 'src/schemes/task.scheme';
import { ObjectIdParserMiddleware } from 'src/midldewares/object-id-parser.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema }
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ObjectIdParserMiddleware).forRoutes('tasks/:id');
  }
}
