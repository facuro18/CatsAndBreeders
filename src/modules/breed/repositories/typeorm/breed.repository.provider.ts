import { BreedRepositoryImpl } from './breed.repository.impl';
import { DataSource } from 'typeorm';

export const breedRepositoryProvider = {
  provide: BreedRepositoryImpl,
  inject: [DataSource], // Asegura que DataSource esté inyectado
  useFactory: async (dataSource: DataSource) => {
    return new BreedRepositoryImpl(dataSource);
  },
};
