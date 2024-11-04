import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CatModel } from '../models/cat.model';
import { CatEntity } from '../entities/cat.entity';
import { UpdateCatDto } from '../dtos';
import { CatRepository } from './cat.repository';
import { MySqlDatabase } from '@core/database/mysql-database';
import { toCatEntity } from '../mappers/cat.mapper';

@Injectable()
export class CatRepositoryImpl extends Repository<CatModel> implements CatRepository {
  private _catRepository = MySqlDatabase.getDataSource().getRepository(CatModel);

  public async findAll(): Promise<CatEntity[]> {
    // const cats = await this.createQueryBuilder('cat')
    //   .leftJoin('cat.breed', 'breed')
    //   .select(['cat.id', 'cat.name', 'cat.age', 'breed.id']) // Selecciona solo el id de breed
    //   .getMany();
    const cats = await this._catRepository.find({
      relations: {
        breed: false,
      },
    });

    console.log(cats);

    return cats.map(toCatEntity);
  }

  public async findById(id: number): Promise<CatEntity | null> {
    const cat = await this._catRepository.findOne({
      where: {
        id,
      },
      relations: {
        breed: true,
      },
    });
    return cat ? toCatEntity(cat) : null;
  }

  public async store(cat: CatEntity): Promise<CatEntity> {
    const newCat = this._catRepository.create(cat);
    await this._catRepository.save(newCat);

    // Vuelve a cargar el CatModel con la relación `breed` populada
    const savedCat = await this._catRepository.findOne({
      where: { id: newCat.id },
      relations: { breed: true },
    });

    //? Return entity created or not
    return savedCat ? toCatEntity(savedCat) : null;
  }

  public async updateOne(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity | null> {
    const cat = await this._catRepository.findOne({
      where: { id },
      relations: { breed: true },
    });

    if (!cat) return null;

    Object.assign(cat, { ...updateCatDto, updatedDate: new Date() });
    await this._catRepository.save(cat);

    //? Return entity updated or not
    return cat ? toCatEntity(cat) : null;
  }

  public async destroy(id: number): Promise<boolean> {
    const deletedRecords = await this._catRepository.softDelete({ id });
    return deletedRecords.affected > 0 ? true : false;
  }
}
