// cat.mapper.ts
import { CatEntity } from '../entities/cat.entity';
import { CreateCatDto } from '../dtos';

export function toCatFromDto(createCatDto: CreateCatDto): CatEntity {
  return new CatEntity({
    name: createCatDto.name,
    age: createCatDto.age,
    breed: createCatDto.breed,
    createdDate: new Date(), // Se puede establecer aquí
    updatedDate: new Date(),
    deletedDate: null,
  });
}
