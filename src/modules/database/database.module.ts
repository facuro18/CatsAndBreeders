import { Module } from '@nestjs/common';
import { typeOrmDBProvider } from './typeorm.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [typeOrmDBProvider],
  exports: [typeOrmDBProvider],
})
export class DatabaseModule {}
