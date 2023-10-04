import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

import { TaskFormat } from "src/enums/task-format.enum";



export class TaskStatusParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const status = req.body.status;

    if (!status) throw new BadRequestException({ message: 'No task status to apply was found' });

    if (!Object.values(TaskFormat).includes(status)) throw new BadRequestException({ message: 'Task status is broken' });

    next();
  }
}