import { forwardRef, Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';

import { DatabaseModule } from '@modules/database/database.module';

import { catRepositoryProvider } from './repositories/typeorm/cat.repository.provider';
import { BreedModule } from '@modules/breed/breed.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => BreedModule)],
  controllers: [CatController],
  providers: [catRepositoryProvider, CatService],
  exports: [CatService], //? Difference with providers?
})
export class CatModule {}
