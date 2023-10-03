import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;

    if (!bearerToken) throw new BadRequestException({ message: 'No authorization headers found' });

    const token = this.extractTokenFromHeaders(bearerToken);

    if (!token) throw new UnauthorizedException();

    try {
      const { id, username, email } = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );

      // request['user'] = { id, username, email };
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return true;
  }

  private extractTokenFromHeaders(authorizationHeader: string): string | null {
    const [role, token] = authorizationHeader.split(' ') || [];
    return role === 'Bearer' ? token : null;
  }
}