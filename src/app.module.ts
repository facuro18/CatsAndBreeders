import { Logger, Module } from '@nestjs/common';
import { CatModule } from './modules/cat/cat.module';
import { SharedModule } from './modules/shared/shared.module';
import { BreedModule } from '@modules/breed/breed.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CatModule, BreedModule, SharedModule, AuthModule, UserModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
