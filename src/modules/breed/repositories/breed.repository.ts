import { UpdateBreedDto } from '../dtos';
import { BreedEntity } from '../entities/breed.entity';

export abstract class BreedRepository {
  abstract findAll: () => Promise<BreedEntity[]>;

  abstract findById(id: number): Promise<BreedEntity | null>;

  abstract store(breed: BreedEntity): Promise<BreedEntity>;

  abstract updateOne(id: number, updateBreedDto: UpdateBreedDto): Promise<BreedEntity | null>;

  abstract destroy(id: number): Promise<boolean>;
}
