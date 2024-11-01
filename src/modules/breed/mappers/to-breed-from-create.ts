// cat.mapper.ts

import { CreateBreedDto } from '../dtos';
import { BreedEntity } from '../entities/breed.entity';

export function toBreedFromCreateDto(createCatDto: CreateBreedDto): BreedEntity {
  return new BreedEntity({
    name: createCatDto.name,
  });
}
