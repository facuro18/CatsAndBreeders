import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';

import { DatabaseModule } from '@modules/database/database.module';

import { catRepositoryProvider } from './repositories/typeorm/cat.repository.provider';

@Module({
  imports: [DatabaseModule], // ? Is this even needed
  controllers: [CatController],
  providers: [catRepositoryProvider, CatService], //? Why is it a provider
  exports: [CatService], //? Difference with providers?
})
export class CatModule {}
