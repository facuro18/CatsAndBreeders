import { UpdateCatDto } from '../dtos';
import { CatEntity } from '../entities/cat.entity';

export interface ICatRepository {
  findAll: () => Promise<CatEntity[]>;

  findById(id: number): Promise<CatEntity | null>;

  store(cat: CatEntity): Promise<CatEntity>;

  updateOne(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity | null>;

  destroy(id: number): Promise<boolean>;
}
