import { CatRepositoryImpl } from './cat.repository.impl';
import { DataSource } from 'typeorm';

export const catRepositoryProvider = {
  provide: CatRepositoryImpl,
  inject: [DataSource], // Asegura que DataSource esté inyectado
  useFactory: async (dataSource: DataSource) => {
    return new CatRepositoryImpl(dataSource);
  },
};
