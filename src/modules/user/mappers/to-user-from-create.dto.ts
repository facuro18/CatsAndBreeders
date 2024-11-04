// user.mapper.ts
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos';
import { ValidRoles } from '@modules/shared/constants/roles';

export function toUserFromCreateDto(createUserDto: CreateUserDto, roles: ValidRoles[]): UserEntity {
  return new UserEntity({
    name: createUserDto.name,
    email: createUserDto.email,
    password: createUserDto.password,
    roles: [...roles], //Asign role
  });
}
