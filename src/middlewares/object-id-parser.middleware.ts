import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { Types } from "mongoose";

export class ObjectIdParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) throw new BadRequestException({ message: 'Object ID is broken' });

    next();
  }
}