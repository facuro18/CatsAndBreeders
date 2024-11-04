import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';

import { CatRepository } from './repositories/cat.repository';
import { CatRepositoryImpl } from './repositories/cat.repository.impl';

//, forwardRef(() => BreedModule) Circular dependencies

@Module({
  imports: [],
  controllers: [CatController],
  providers: [CatService, { provide: CatRepository, useClass: CatRepositoryImpl }],
  exports: [],
})
export class CatModule {}
