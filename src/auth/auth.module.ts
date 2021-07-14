// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UserModule } from 'src/user/user.module';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './guards/roles.guard';

// @Module({
//   imports: [
//     UserModule,
//     PassportModule,
//     JwtModule.registerAsync({
//       imports: [ConfigService],
//       useFactory: async (configService: ConfigService) => {
//         return {
//           secret: configService.get<string>('JWT_KEY'),
//           signOptions: { expiresIn: '365d' },
//         };
//       },
//       inject: [ConfigService],
//     }),
//     ConfigModule,
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy],
//   exports: [JwtModule, AuthService],
// })
// export class AuthModule {}
