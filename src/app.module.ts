import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatModule } from './modules/cat/cat.module';
import { configuration, ConfigurationSchema } from './core/index';
import { DatabaseModule } from './modules/database/database.module';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CatModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: ConfigurationSchema,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
