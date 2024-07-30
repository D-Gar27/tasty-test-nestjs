import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 't@styJWT',
    });
  }

  async validate(payload: any) {
    return {
      user_id: payload.sub,
      email: payload.email,
      is_admin: payload.is_admin,
      is_banned: payload.is_banned,
    };
  }
}
