import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatModule } from './modules/cat/cat.module';
import { configuration, ConfigurationSchema } from './core/index';
import { DatabaseModule } from './modules/database/database.module';
import { SharedModule } from './modules/shared/shared.module';
import { BreedModule } from '@modules/breed/breed.module';

@Module({
  imports: [
    CatModule,
    BreedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: ConfigurationSchema,
    }),
    DatabaseModule,
    SharedModule,
    BreedModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
