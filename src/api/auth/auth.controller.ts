import { Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(): Promise<any> {
    return this.authService.login();
  }

  @Post('/sign-up')
  signUp(): Promise<any> {
    return this.authService.signUp();
  }
}
