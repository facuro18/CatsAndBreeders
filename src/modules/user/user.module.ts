import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository, UserRepositoryImpl } from './repositories';
// import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, { provide: UserRepository, useClass: UserRepositoryImpl }],
  exports: [UserService],
})
export class UserModule {}
