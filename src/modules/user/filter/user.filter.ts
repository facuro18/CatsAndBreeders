import { UserEntity } from '../entities/user.entity';

type MapperParams = {
  include?: string[]; // Propiedades específicas a incluir
  exclude?: string[]; // Propiedades específicas a excluir
  includeRelated?: boolean; // Controla si se incluye la entidad relacionada (por ejemplo, breed)
  isIncludeMode?: boolean;
  all?: boolean;
};

export const filterUser = (user: UserEntity, params: MapperParams): Partial<UserEntity> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { include = [], exclude = [], includeRelated = false, isIncludeMode = true, all = true } = params;
  const result: Partial<UserEntity> = {};

  const shouldInclude = (key: string): boolean => {
    if (isIncludeMode) {
      // En modo inclusión, incluye todo si `all` es true
      return all || (include && include.includes(key));
    } else {
      // En modo exclusión, excluye todo si `all` es true
      return !(all || (exclude && exclude.includes(key)));
    }
  };

  Object.keys(user).forEach((key) => {
    if (shouldInclude(key) && key in user) {
      result[key] = user[key as keyof UserEntity];
    }
  });

  // Incluir entidades relacionadas si se requiere
  // if (includeRelated && user.posts) {
  //   result.posts = user.posts.map((post) => ({ ...post }));
  // }

  return result;
};
