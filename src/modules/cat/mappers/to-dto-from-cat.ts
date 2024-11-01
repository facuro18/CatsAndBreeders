// cat.mapper.ts
import { CatEntity } from '../entities/cat.entity';
import { CatDto } from '../dtos/cat.dto';
import { toDtoFromBreed } from '@modules/breed/mappers';

export function toDtoFromCat(catEntity: CatEntity): CatDto {
  return new CatDto({
    id: catEntity.id,
    name: catEntity.name,
    age: catEntity.age,
    breedId: catEntity.breedId,
    breed: catEntity.breed ? toDtoFromBreed(catEntity.breed) : null,
  });
}
