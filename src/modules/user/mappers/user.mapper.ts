import { UserEntity } from '../entities/user.entity';

export const toUserEntity = (object: Record<string, any>): UserEntity => {
  // Mapeo de propiedades básicas
  const { id, name, email, password, roles } = object;

  const mappedRoles = roles.split(',');

  return new UserEntity({ id, name, email, password, roles: mappedRoles });
};
