import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';
import { MySqlDatabase } from '@core/database/mysql-database';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { toUserEntity } from '../mappers';
import { UpdateUserDto } from '../dtos';
// import { ValidRoles } from '@modules/shared/constants/roles';

@Injectable()
export class UserRepositoryImpl extends Repository<UserModel> implements UserRepository {
  private _userRepository = MySqlDatabase.getDataSource().getRepository(UserModel);

  public async findAll(): Promise<UserEntity[]> {
    const users = await this._userRepository.find({});

    return users.map(toUserEntity);
  }

  public async findById(id: number): Promise<UserEntity | null> {
    const user = await this._userRepository.findOne({
      where: {
        id,
      },
    });
    return user ? toUserEntity(user) : null;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this._userRepository.findOne({
      where: {
        email,
      },
    });
    return user ? toUserEntity(user) : null;
  }

  public async store(user: UserEntity): Promise<UserEntity> {
    const mappedRoles: string = user.roles.join(',');

    console.log(mappedRoles);

    const newUser = this._userRepository.create({ ...user, roles: mappedRoles });
    await this._userRepository.save(newUser);

    //? Return entity created or not
    return toUserEntity(newUser);
  }

  public async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity | null> {
    const user = await this._userRepository.findOne({
      where: { id },
    });

    if (!user) return null;

    Object.assign(user, { ...updateUserDto, updatedDate: new Date() });
    await this._userRepository.save(user);

    //? Return entity updated or not
    return toUserEntity(user);
  }

  public async destroy(id: number): Promise<boolean> {
    const deletedRecords = await this._userRepository.delete({ id });
    return deletedRecords.affected > 0 ? true : false;
  }
}
