import { Column, Entity, OneToMany } from 'typeorm';
import { CatModel } from '@modules/cat/models/cat.model';

@Entity({ name: 'breeds' })
export class BreedModel {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CatModel, (cat) => cat.breed)
  cats: CatModel[];
}
