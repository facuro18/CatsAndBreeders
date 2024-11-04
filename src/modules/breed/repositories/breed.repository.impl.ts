import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BreedRepository } from './breed.repository';
import { BreedModel } from '@modules/breed/models/breed.model';
import { BreedEntity } from '@modules/breed/entities/breed.entity';
import { UpdateBreedDto } from '@modules/breed/dtos';
// import { CatEntity } from '@modules/cat/entities/cat.entity';
import { errors } from '@modules/shared/constants/errors.config';
import { MySqlDatabase } from '@core/database/mysql-database';
import { toBreedEntity } from '../mappers/breed.mapper';

@Injectable()
export class BreedRepositoryImpl extends Repository<BreedModel> implements BreedRepository {
  private _breedRepository = MySqlDatabase.getDataSource().getRepository(BreedModel);

  public async findAll(): Promise<BreedEntity[]> {
    const breeds = await this._breedRepository.find({
      relations: {
        cats: true,
      },
    });
    return breeds.map(toBreedEntity); // Mapea cada modelo a entidad
  }

  public async findById(id: number): Promise<BreedEntity | null> {
    const breed = await this._breedRepository.findOne({
      where: {
        id,
      },
      relations: {
        cats: true,
      },
    });
    return breed ? toBreedEntity(breed) : null; // Mapea si existe
  }

  public async store(breed: BreedEntity): Promise<BreedEntity> {
    const newBreed = this._breedRepository.create(breed);
    await this._breedRepository.save(newBreed);

    const savedBreed = await this._breedRepository.findOne({
      where: { id: newBreed.id },
      relations: { cats: true },
    });

    return savedBreed ? toBreedEntity(savedBreed) : null;
  }

  public async updateOne(id: number, updateBreedDto: UpdateBreedDto): Promise<BreedEntity | null> {
    const breed = await this._breedRepository.findOne({
      where: { id },
      relations: { cats: true },
    });

    if (!breed) return null;

    Object.assign(breed, { ...updateBreedDto });
    await this._breedRepository.save(breed);

    return breed ? toBreedEntity(breed) : null;
  }

  public async destroy(id: number): Promise<boolean> {
    const breed = await this._breedRepository.findOne({
      where: { id },
      relations: { cats: true },
    });

    if (!breed) return false;
    if (breed.cats.length > 0) throw new ConflictException(errors.requestConflict);
    // CASCADE not enabled

    const deletedRecords = await this._breedRepository.delete({ id });
    return deletedRecords.affected > 0 ? true : false;
  }
}
