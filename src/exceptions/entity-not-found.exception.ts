import { HttpException, HttpStatus } from "@nestjs/common";

export class EntityNotFound extends HttpException {
  constructor(message?: string, status?: number) {
    super(message || 'Such item was not found', status || HttpStatus.BAD_REQUEST);
  }
}