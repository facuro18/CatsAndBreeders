// import { toCatEntity } from '@modules/cat/mappers/cat.mapper';
import { BreedEntity } from '../entities/breed.entity';

export const toBreedEntity = (object: Record<string, any>): BreedEntity => {
  const { id, name } = object;
  let cats = null;

  if ('cats' in object && Array.isArray(object.cats)) {
    cats = [
      ...object.cats.map((cat) => {
        return { ...cat };
      }),
    ];
  }

  return new BreedEntity({ id, name, cats });
};
