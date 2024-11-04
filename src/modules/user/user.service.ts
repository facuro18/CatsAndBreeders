import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserRepository } from './repositories';
import { UserEntity } from './entities/user.entity';
import { errors } from '@modules/shared/constants/errors.config';
import { toUserFromCreateDto } from './mappers';
import { ValidRoles } from '@modules/shared/constants/roles';

@Injectable()
export class UserService {
  // private logger = new Logger(UserService.name);

  constructor(@Inject(UserRepository) private readonly _userRepository: UserRepository) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this._userRepository.findAll();
    return users;
  }

  async create(createUserDto: CreateUserDto, roles: ValidRoles[]): Promise<UserEntity> {
    const user = toUserFromCreateDto(createUserDto, roles);

    console.log('USER', user);

    //Validation error
    if (!user) throw new InternalServerErrorException(errors.validationFailed);

    return this._userRepository.store(user);
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this._userRepository.findById(id);
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this._userRepository.findByEmail(email);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity | null> {
    const userUpdated = await this._userRepository.updateOne(id, updateUserDto);
    return userUpdated;
  }

  async delete(id: number): Promise<boolean> {
    return await this._userRepository.destroy(id);
  }
}
