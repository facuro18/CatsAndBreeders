import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dtos';
import { CatEntity } from './entities/cat.entity';
import { toCatFromCreateDto } from './mappers';
import { errors } from '@modules/shared/constants/errors.config';
import { CatRepository } from './repositories/cat.repository';

@Injectable()
export class CatService {
  // private logger = new Logger(CatService.name);

  constructor(@Inject(CatRepository) private readonly _catRepository: CatRepository) {}

  async findAll(): Promise<CatEntity[]> {
    const cats = await this._catRepository.findAll();
    console.log(cats);

    return cats;
  }

  async create(createCatDto: CreateCatDto): Promise<CatEntity> {
    const cat = toCatFromCreateDto(createCatDto);

    if (!cat) throw new InternalServerErrorException(errors.validationFailed);

    return this._catRepository.store(cat);
  }

  async findById(id: number): Promise<CatEntity> {
    const cat = await this._catRepository.findById(id);
    if (!cat) throw new NotFoundException(errors.notFound);
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity | null> {
    const catUpdated = await this._catRepository.updateOne(id, updateCatDto);
    if (!catUpdated) throw new NotFoundException(errors.notFound);
    return catUpdated;
  }

  async delete(id: number): Promise<void> {
    const catDeleted = await this._catRepository.destroy(id);
    if (!catDeleted) throw new NotFoundException(errors.notFound);
  }
}
