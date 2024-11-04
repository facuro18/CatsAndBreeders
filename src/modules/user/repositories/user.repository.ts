import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findAll: () => Promise<UserEntity[]>;

  abstract findById(id: number): Promise<UserEntity | null>;

  abstract findByEmail(email: string): Promise<UserEntity | null>;

  abstract store(user: UserEntity): Promise<UserEntity>;

  abstract updateOne(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity | null>;

  abstract destroy(id: number): Promise<boolean>;
}
