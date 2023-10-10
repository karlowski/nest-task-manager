import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { NewUser } from 'src/interfaces/new-user.interface';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { ApiOperationResponse } from 'src/interfaces/api-operation-response.interface';
import { AccessToken } from 'src/interfaces/access-token.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() { email, password }: LoginUserDto): Promise<AccessToken> {
    return this.authService.login(email, password);
  }

  @Post('/sign-up')
  signUp(@Body() user: CreateUserDto): Promise<ApiOperationResponse<NewUser>> {
    return this.authService.signUp(user);
  }
}
