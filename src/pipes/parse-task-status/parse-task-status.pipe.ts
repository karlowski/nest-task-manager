import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskFormat } from 'src/enums/task-format.enum';

@Injectable()
export class ParseTaskStatusPipe implements PipeTransform {
  transform(body: Record<string, string>) {
    if (!body.status) {
      throw new BadRequestException({ message: 'No task status to apply was found' });
    }

    if (!Object.values(TaskFormat).includes(body.status as TaskFormat)) {
      throw new BadRequestException({ message: 'Task status is broken' });
    }
    
    return body;
  }
}
