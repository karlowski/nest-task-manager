import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Observable, combineLatest, from, map, mergeMap, of, switchMap, tap } from 'rxjs';

import { ApiOperationResponse } from 'src/interfaces/api-operation-response.interface';
import { IProject } from 'src/interfaces/project.interface';
import { ITask } from 'src/interfaces/task.interface';
import { Task } from 'src/schemes/task.scheme';

@Injectable()
export class ProjectUpdateCascadeInterceptor implements NestInterceptor {
  constructor(
    @InjectModel('Project')
    private projectModel: Model<IProject>
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiOperationResponse<ITask>> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const taskId = request.params.id;
    const projectId = request.params.projectId;
    
    return next.handle()
      .pipe(
        switchMap((responseData: ApiOperationResponse<ITask>) => {
          return combineLatest([
            of(responseData), 
            from(this.projectModel.findById(projectId))
          ]).pipe(
            switchMap(([responseData, project]) => {
              const updatedTasks = this.isAssign(request.route.path) 
                ? [...project.tasks, { _id: taskId }] 
                : project.tasks.filter((task) => task._id.toString() !== taskId);

              return combineLatest([
                of(responseData),
                from(this.projectModel.findByIdAndUpdate(projectId, { tasks: updatedTasks }))
              ])
            })
          );
        }),
        map(([{ message, data }, updateResponse]) => {
          data.project = this.isAssign(request.route.path) ? updateResponse._id : null;
          return { message, data };
        })
      );
  }

  private isAssign(path: string): boolean {
    const [endpoint, projectIdParam, operation, taskIdParam] = path.split('/').filter((chunk) => !!chunk);
    return operation === 'assign';
  }
}
