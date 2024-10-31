import { CreateCatDto, UpdateCatDto } from '../dtos';
import { CatEntity } from '../entities/cat.entity';

export interface ICatRepository {
  findAll: () => Promise<CatEntity[]>;

  findById(id: number): Promise<CatEntity | null>;

  store(cat: CreateCatDto): Promise<CatEntity>;

  updateOne(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity | undefined>;

  destroy(id: number): Promise<void>;
}
