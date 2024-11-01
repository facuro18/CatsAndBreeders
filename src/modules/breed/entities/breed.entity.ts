import { CatEntity } from '@modules/cat/entities/cat.entity';

export class BreedEntity {
  public id?: number;
  public name: string;

  public cats?: CatEntity[];

  constructor(init: Partial<BreedEntity>) {
    Object.assign(this, init);
  }
}
