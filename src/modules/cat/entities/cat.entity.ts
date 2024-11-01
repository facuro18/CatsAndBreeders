import { BreedEntity } from '@modules/breed/entities/breed.entity';

export class CatEntity {
  public id?: number;
  public name: string;
  public age: number;
  public breedId: number;
  public breed?: BreedEntity;
  public createdDate: Date;
  public updatedDate: Date;
  public deletedDate?: Date;

  constructor(init: Partial<CatEntity>) {
    Object.assign(this, init);
  }
}
