import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CatModel } from '../../models/cat.model';
import { CatEntity } from '../../entities/cat.entity';
import { CreateCatDto, UpdateCatDto } from '../../dtos';
import { ICatRepository } from '../cat.repository';

@Injectable()
export class CatRepositoryImpl extends Repository<CatModel> implements ICatRepository {
  constructor(private readonly dataSource: DataSource) {
    super(CatModel, dataSource.createEntityManager());
  }

  public async findAll(): Promise<CatEntity[]> {
    const cats = await this.find({});
    return cats.map(this.mapToEntity); // Mapea cada modelo a entidad
  }

  public async findById(id: number): Promise<CatEntity | null> {
    const cat = await this.findOneBy({ id });
    return cat ? this.mapToEntity(cat) : null; // Mapea si existe
  }

  public async store(cat: CatEntity): Promise<CatEntity> {
    const newCat = this.create(cat);
    return this.mapToEntity(await this.save(newCat)); // Mapea el nuevo cat
  }

  public async updateOne(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity | undefined> {
    const cat = await this.findById(id);
    if (!cat) return undefined;
    Object.assign(cat, updateCatDto);
    return this.mapToEntity(await this.save(cat)); // Mapea el cat actualizado
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }

  private mapToEntity(catModel: CatModel): CatEntity {
    return new CatEntity({
      ...catModel,
    });
  }
}
