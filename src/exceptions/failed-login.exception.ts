import { HttpException, HttpStatus } from "@nestjs/common";

export class FailedLoginException extends HttpException {
  constructor(message?: string, status?: number) {
    super(message || 'Email or password does not match', status || HttpStatus.BAD_REQUEST);
  }
}