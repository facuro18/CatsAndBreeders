import { ConflictException, Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { IBreedRepository } from '../breed.repository';
import { BreedModel } from '@modules/breed/models/breed.model';
import { BreedEntity } from '@modules/breed/entities/breed.entity';
import { UpdateBreedDto } from '@modules/breed/dtos';
import { CatEntity } from '@modules/cat/entities/cat.entity';
import { CatModel } from '@modules/cat/models/cat.model';
import { errors } from '@modules/shared/helpers/errors.config';

@Injectable()
export class BreedRepositoryImpl extends Repository<BreedModel> implements IBreedRepository {
  constructor(private readonly dataSource: DataSource) {
    super(BreedModel, dataSource.createEntityManager());
  }

  public async findAll(): Promise<BreedEntity[]> {
    const breeds = await this.find({
      relations: {
        cats: true,
      },
    });
    return breeds.map(mapBreedToEntity); // Mapea cada modelo a entidad
  }

  public async findById(id: number): Promise<BreedEntity | null> {
    const breed = await this.findOne({
      where: {
        id,
      },
      relations: {
        cats: true,
      },
    });
    return breed ? mapBreedToEntity(breed) : null; // Mapea si existe
  }

  public async store(breed: BreedEntity): Promise<BreedEntity> {
    const newBreed = this.create(breed);
    await this.save(newBreed);

    const savedBreed: BreedModel = await this.findOne({
      where: { id: newBreed.id },
      relations: { cats: true },
    });

    return savedBreed ? mapBreedToEntity(savedBreed) : null;
  }

  public async updateOne(id: number, updateBreedDto: UpdateBreedDto): Promise<BreedEntity | null> {
    const breed = await this.findOne({
      where: { id },
      relations: { cats: true },
    });

    if (!breed) return null;

    Object.assign(breed, { ...updateBreedDto });
    await this.save(breed);

    return breed ? mapBreedToEntity(breed) : null;
  }

  public async destroy(id: number): Promise<boolean> {
    const breed = await this.findOne({
      where: { id },
      relations: { cats: true },
    });

    if (!breed) return false;
    if (breed.cats.length > 0) throw new ConflictException(errors.requestConflict);
    // CASCADE not enabled

    const deletedRecords = await this.delete({ id });
    return deletedRecords.affected > 0 ? true : false;
  }
}

const mapBreedToEntity = (breedModel: BreedModel): BreedEntity => {
  return new BreedEntity({
    id: breedModel.id,
    name: breedModel.name,
    cats: breedModel.cats ? breedModel.cats.map((cat) => mapCatToEntity(cat, breedModel.id)) : null,
  });
};

const mapCatToEntity = (catModel: CatModel, breedId: number): CatEntity => {
  return new CatEntity({
    id: catModel.id,
    name: catModel.name,
    age: catModel.age,
    breedId: breedId,
    breed: null,
    createdDate: catModel.createdDate,
    updatedDate: catModel.updatedDate,
    deletedDate: catModel.deletedDate,
  });
};
