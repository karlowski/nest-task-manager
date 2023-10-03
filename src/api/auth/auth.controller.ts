import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { IUser } from 'src/interfaces/user.interface';
import { UserResponse } from 'src/interfaces/user-response.interface';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() { email, password }: LoginUserDto): Promise<any> {
    return this.authService.login(email, password);
  }

  @Post('/sign-up')
  signUp(@Body() user: CreateUserDto): Promise<UserResponse> {
    return this.authService.signUp(user);
  }
}
