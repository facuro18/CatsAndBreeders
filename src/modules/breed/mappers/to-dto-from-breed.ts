// cat.mapper.ts

import { toDtoFromCat } from '@modules/cat/mappers';
import { BreedDto } from '../dtos';
import { BreedEntity } from '../entities/breed.entity';

export function toDtoFromBreed(breedEntity: BreedEntity): BreedDto {
  console.log(breedEntity);
  return new BreedDto({
    id: breedEntity.id,
    name: breedEntity.name,
    cats: breedEntity.cats ? breedEntity.cats.map((cat) => toDtoFromCat(cat)) : null,
  });
}
