import { Injectable, Logger } from '@nestjs/common';
import { CatRepositoryImpl } from './repositories/typeorm/cat.repository.impl';
import { CreateCatDto, UpdateCatDto } from './dtos';
import { CatEntity } from './entities/cat.entity';
import { toCatFromDto } from './mappers';

@Injectable()
export class CatService {
  private logger = new Logger(CatService.name);

  constructor(private readonly _catRepository: CatRepositoryImpl) {}

  async findAll(): Promise<CatEntity[]> {
    try {
      console.log(await this._catRepository.count());
      const cats = await this._catRepository.findAll();
      return cats;
    } catch (error) {
      this.logger.log(`CatsService:findAll : ${JSON.stringify(error.message)}`);
    }
  }

  async create(createCatDto: CreateCatDto): Promise<CatEntity> {
    try {
      console.log('CAT', createCatDto);

      // * Mapping

      const cat: CatEntity = toCatFromDto(createCatDto);

      console.log('CAT2', cat);

      return this._catRepository.store(cat);
    } catch (error) {
      this.logger.log(`CatsService:create: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<CatEntity> {
    try {
      const cat = await this._catRepository.findById(id);
      if (!cat) {
        throw new Error('Cat not found.');
      }
      return cat;
    } catch (error) {
      this.logger.log(`CatsService:findById: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity> {
    try {
      await this.findById(id);
      return await this._catRepository.updateOne(id, updateCatDto);
    } catch (error) {
      this.logger.log(`CatsService:update: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async delete(id: number) {
    try {
      return await this._catRepository.destroy(id);
    } catch (error) {
      this.logger.log(`CatsService:delete: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }
}
