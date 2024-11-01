import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CatModel } from '../../models/cat.model';
import { CatEntity } from '../../entities/cat.entity';
import { UpdateCatDto } from '../../dtos';
import { ICatRepository } from '../cat.repository';
import { BreedEntity } from '@modules/breed/entities/breed.entity';
import { BreedModel } from '@modules/breed/models/breed.model';

@Injectable()
export class CatRepositoryImpl extends Repository<CatModel> implements ICatRepository {
  constructor(private readonly dataSource: DataSource) {
    super(CatModel, dataSource.createEntityManager());
  }

  public async findAll(): Promise<CatEntity[]> {
    // const cats = await this.createQueryBuilder('cat')
    //   .leftJoin('cat.breed', 'breed')
    //   .select(['cat.id', 'cat.name', 'cat.age', 'breed.id']) // Selecciona solo el id de breed
    //   .getMany();

    const cats: CatModel[] = await this.find({
      relations: {
        breed: true,
      },
    });

    return cats.map(mapCatToEntity);
  }

  public async findById(id: number): Promise<CatEntity | null> {
    const cat: CatModel = await this.findOne({
      where: {
        id,
      },
      relations: {
        breed: true,
      },
    });
    return cat ? mapCatToEntity(cat) : null;
  }

  public async store(cat: CatEntity): Promise<CatEntity> {
    const newCat = this.create(cat);
    await this.save(newCat);

    // Vuelve a cargar el CatModel con la relación `breed` populada
    const savedCat: CatModel = await this.findOne({
      where: { id: newCat.id },
      relations: { breed: true },
    });

    //? Return entity created or not
    return savedCat ? mapCatToEntity(savedCat) : null;
  }

  public async updateOne(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity | null> {
    const cat = await this.findOne({
      where: { id },
      relations: { breed: true },
    });

    if (!cat) return null;

    Object.assign(cat, { ...updateCatDto, updatedDate: new Date() });
    await this.save(cat);

    //? Return entity updated or not
    return cat ? mapCatToEntity(cat) : null;
  }

  public async destroy(id: number): Promise<boolean> {
    const deletedRecords = await this.softDelete({ id });
    return deletedRecords.affected > 0 ? true : false;
  }
}

const mapCatToEntity = (catModel: CatModel): CatEntity => {
  return new CatEntity({
    id: catModel.id,
    name: catModel.name,
    age: catModel.age,
    breedId: catModel.breed.id,
    breed: Object.keys(catModel.breed).length > 1 ? mapBreedToEntity(catModel.breed) : null,
    //! In case breed is not populated, only bring id breed: {id: }
    createdDate: catModel.createdDate,
    updatedDate: catModel.updatedDate,
    deletedDate: catModel.deletedDate,
  });
};

const mapBreedToEntity = (breedModel: BreedModel): BreedEntity => {
  return new BreedEntity({
    id: breedModel.id,
    name: breedModel.name,
  });
};
