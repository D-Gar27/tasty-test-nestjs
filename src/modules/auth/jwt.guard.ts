import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(private jwtService: JwtService) {
    super();
    this.logger.log('JwtService initialized:', jwtService); // Log the JwtService instance
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let activate: boolean;
    this.logger.log(this.jwtService);

    try {
      activate = (await super.canActivate(context)) as boolean;
      this.logger.log(`Super canActivate returned: ${activate}`);
    } catch (error) {
      this.logger.error('Error in super.canActivate', error);
      throw new UnauthorizedException('Unauthorized');
    }

    if (!activate) {
      this.logger.error('Super canActivate returned false');
      throw new UnauthorizedException('Unauthorized');
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      this.logger.error('No token provided');
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: 't@styJWT',
      });
      request.user = decoded;
      this.logger.log(`Token verified, user: ${JSON.stringify(decoded)}`);
    } catch (error) {
      this.logger.error('Token verification failed', error);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
