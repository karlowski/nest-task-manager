import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, combineLatest, from, map, of, switchMap, tap } from 'rxjs';
import { ApiOperationResponse } from 'src/interfaces/api-operation-response.interface';
import { IProject } from 'src/interfaces/project.interface';

import { ITask } from 'src/interfaces/task.interface';

@Injectable()
export class TaskUpdateCascadeInterceptor implements NestInterceptor {
  constructor(
    @InjectModel('Task')
    private taskModel: Model<ITask>
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiOperationResponse<IProject>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const projectId = request.params.id;
    const taskId = request.params.taskId;

    return next.handle()
      .pipe(
        switchMap((responseData: ApiOperationResponse<IProject>) => {
          const project = this.isAssign(request.route.path) ? projectId : null;
          return combineLatest([
            of(responseData),
            from(this.taskModel.findByIdAndUpdate(taskId, { project }))
          ]);
        }),
        map(([responseData, taskResponse]) => responseData)
      );
  }

  private isAssign(path: string): boolean {
    const [endpoint, projectIdParam, operation, taskIdParam] = path.split('/').filter((chunk) => !!chunk);
    return operation === 'assign';
  }
}
