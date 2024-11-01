import { forwardRef, Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { DatabaseModule } from '@modules/database/database.module';
import { breedRepositoryProvider } from './repositories/typeorm/breed.repository.provider';
import { CatModule } from '@modules/cat/cat.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => CatModule)],
  controllers: [BreedController],
  providers: [breedRepositoryProvider, BreedService],
  exports: [BreedService],
})
export class BreedModule {}
