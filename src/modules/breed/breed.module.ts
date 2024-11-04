import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';
import { BreedRepository } from './repositories/breed.repository';
import { BreedRepositoryImpl } from './repositories/breed.repository.impl';

@Module({
  imports: [],
  controllers: [BreedController],
  providers: [BreedService, { provide: BreedRepository, useClass: BreedRepositoryImpl }],
  exports: [],
})
export class BreedModule {}
