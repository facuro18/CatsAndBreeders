import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { errors } from '@modules/shared/constants/errors.config';
import { BreedEntity } from './entities/breed.entity';
import { CreateBreedDto, UpdateBreedDto } from './dtos';
import { toBreedFromCreateDto } from './mappers';
import { BreedRepository } from './repositories/breed.repository';

@Injectable()
export class BreedService {
  // private logger = new Logger(BreedService.name);

  constructor(private readonly _breedRepository: BreedRepository) {}

  async findAll(): Promise<BreedEntity[]> {
    const breeds = await this._breedRepository.findAll();
    return breeds;
  }

  async create(createBreedDto: CreateBreedDto): Promise<BreedEntity> {
    const breed = toBreedFromCreateDto(createBreedDto);

    if (!breed) throw new InternalServerErrorException(errors.validationFailed);

    return this._breedRepository.store(breed);
  }

  async findById(id: number): Promise<BreedEntity> {
    const breed = await this._breedRepository.findById(id);
    if (!breed) throw new NotFoundException(errors.notFound);
    return breed;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto): Promise<BreedEntity> {
    const breedUpdated = await this._breedRepository.updateOne(id, updateBreedDto);
    if (!breedUpdated) throw new NotFoundException(errors.notFound);
    return breedUpdated;
  }

  async delete(id: number): Promise<void> {
    const breedDeleted = await this._breedRepository.destroy(id);
    if (!breedDeleted) throw new NotFoundException(errors.notFound);
  }
}
