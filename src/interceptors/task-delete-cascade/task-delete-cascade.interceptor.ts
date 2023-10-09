import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, combineLatest, from, map, of, switchMap, tap } from 'rxjs';

import { IProject } from 'src/interfaces/project.interface';
import { ITask } from 'src/interfaces/task.interface';

@Injectable()
export class TaskDeleteCascadeInterceptor implements NestInterceptor {
  constructor(
    @InjectModel('Task')
    private taskModel: Model<ITask>
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<IProject> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const projectId = request.params.id;

    return next.handle()
      .pipe(
        switchMap((responseData: IProject) => {
          return combineLatest([
            of(responseData), 
            from(this.taskModel.deleteMany({ project: projectId }))
          ]);
        }),
        map(([responseData, taskResponse]) => responseData)
      );
  }
}
