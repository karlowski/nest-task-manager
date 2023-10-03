import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { IUser } from 'src/interfaces/user.interface';
import { UserResponse } from 'src/interfaces/user-response.interface';
import { FailedLoginException } from 'src/exceptions/failed-login.exception';
import { TokenResponse } from 'src/interfaces/token-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser>,
    private jwt: JwtService
  ) {}

  async login(email: string, password: string): Promise<TokenResponse> {
    const existingUser = await this.userModel.findOne({ email });

    if (!existingUser) throw new HttpException({ message: 'User does not exist' }, HttpStatus.BAD_REQUEST);

    const isPasswordsMatch = await bcrypt.compare(password, existingUser.password);
    const isEmailsMatch = email === existingUser.email;

    if (!isPasswordsMatch || !isEmailsMatch) throw new FailedLoginException();

    const tokenPayload = { sub: existingUser.id, username: existingUser.username };
    const token = await this.jwt.sign(tokenPayload);

    return { access_token: token };
  }

  async signUp(user: CreateUserDto): Promise<UserResponse> {
    const existingUser = await this.userModel.findOne({ email: user.email });

    if (existingUser) throw new HttpException({ message: 'User already exists' }, HttpStatus.BAD_REQUEST);

    try {
      const timestamp = Date.now();
      const cryptedPassword = await bcrypt.hash(user.password, 10);
      const { _id, username, email, creationTime } = await this.userModel.create({ 
        email: user.email, 
        username: user.username, 
        password: cryptedPassword, 
        creationTime: timestamp 
      });

      return { id: _id, username, email, creationTime };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
