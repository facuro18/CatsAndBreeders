import { UpdateBreedDto } from '../dtos';
import { BreedEntity } from '../entities/breed.entity';

export interface IBreedRepository {
  findAll: () => Promise<BreedEntity[]>;

  findById(id: number): Promise<BreedEntity | null>;

  store(breed: BreedEntity): Promise<BreedEntity>;

  updateOne(id: number, updateBreedDto: UpdateBreedDto): Promise<BreedEntity | null>;

  destroy(id: number): Promise<boolean>;
}
