import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { envs } from '@core/index';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RoleGuard } from './guards';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envs.SECRET_JWT_AUTHENTICATION,
      signOptions: {
        expiresIn: 7200,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, RoleGuard],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
