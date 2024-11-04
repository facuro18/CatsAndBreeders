import { UpdateCatDto } from '../dtos';
import { CatEntity } from '../entities/cat.entity';

export abstract class CatRepository {
  abstract findAll: () => Promise<CatEntity[]>;

  abstract findById(id: number): Promise<CatEntity | null>;

  abstract store(cat: CatEntity): Promise<CatEntity>;

  abstract updateOne(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity | null>;

  abstract destroy(id: number): Promise<boolean>;
}
