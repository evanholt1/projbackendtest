import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//
// note that after validation, a new req.user field will be added.
// and can be accessed using req.user after using the @Request() decorator.
//

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_KEY'),
    });
  }

  async validate(payload: any) {
    console.log(`payload \n${JSON.stringify(payload)}\n`);
    return { userId: payload.sub, userRole: payload.role };
  }
}
