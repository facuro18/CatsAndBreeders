export class CatEntity {
  public id?: number;
  public name: string;
  public age: number;
  public breed: string;
  public createdDate: Date;
  public updatedDate: Date;
  public deletedDate?: Date;

  constructor(init: Partial<CatEntity>) {
    Object.assign(this, init);
  }
}
