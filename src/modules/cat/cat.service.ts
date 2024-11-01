import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CatRepositoryImpl } from './repositories/typeorm/cat.repository.impl';
import { CreateCatDto, UpdateCatDto } from './dtos';
import { CatEntity } from './entities/cat.entity';
import { toCatFromCreateDto } from './mappers';
import { errors } from '@modules/shared/helpers/errors.config';

@Injectable()
export class CatService {
  // private logger = new Logger(CatService.name);

  constructor(private readonly _catRepository: CatRepositoryImpl) {}

  async findAll(): Promise<CatEntity[]> {
    const cats: CatEntity[] = await this._catRepository.findAll();
    return cats;
  }

  async create(createCatDto: CreateCatDto): Promise<CatEntity> {
    const cat: CatEntity = toCatFromCreateDto(createCatDto);

    if (!cat) throw new InternalServerErrorException(errors.validationFailed);

    return this._catRepository.store(cat);
  }

  async findById(id: number): Promise<CatEntity> {
    const cat: CatEntity = await this._catRepository.findById(id);
    if (!cat) throw new NotFoundException(errors.notFound);
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity | undefined> {
    const catUpdated: CatEntity = await this._catRepository.updateOne(id, updateCatDto);
    if (!catUpdated) throw new NotFoundException(errors.notFound);
    return catUpdated;
  }

  async delete(id: number): Promise<void> {
    const catDeleted: boolean = await this._catRepository.destroy(id);
    if (!catDeleted) throw new NotFoundException(errors.notFound);
  }
}
