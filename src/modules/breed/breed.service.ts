import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { errors } from '@modules/shared/helpers/errors.config';
import { BreedRepositoryImpl } from './repositories/typeorm/breed.repository.impl';
import { BreedEntity } from './entities/breed.entity';
import { CreateBreedDto, UpdateBreedDto } from './dtos';
import { toBreedFromCreateDto } from './mappers';

@Injectable()
export class BreedService {
  // private logger = new Logger(BreedService.name);

  constructor(private readonly _breedRepository: BreedRepositoryImpl) {}

  async findAll(): Promise<BreedEntity[]> {
    const breeds: BreedEntity[] = await this._breedRepository.findAll();
    return breeds;
  }

  async create(createBreedDto: CreateBreedDto): Promise<BreedEntity> {
    const breed: BreedEntity = toBreedFromCreateDto(createBreedDto);

    if (!breed) throw new InternalServerErrorException(errors.validationFailed);

    return this._breedRepository.store(breed);
  }

  async findById(id: number): Promise<BreedEntity> {
    const breed: BreedEntity = await this._breedRepository.findById(id);
    if (!breed) throw new NotFoundException(errors.notFound);
    return breed;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto): Promise<BreedEntity | undefined> {
    const breedUpdated: BreedEntity = await this._breedRepository.updateOne(id, updateBreedDto);
    if (!breedUpdated) throw new NotFoundException(errors.notFound);
    return breedUpdated;
  }

  async delete(id: number): Promise<void> {
    const breedDeleted: boolean = await this._breedRepository.destroy(id);
    if (!breedDeleted) throw new NotFoundException(errors.notFound);
  }
}
