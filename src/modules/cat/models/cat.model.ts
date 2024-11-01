import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

import { BreedModel } from '@modules/breed/models/breed.model';

@Entity({ name: 'cats' })
export class CatModel {
  // PROPERTIES

  //@PrimaryGeneratedColumn()
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true })
  deletedDate?: Date;

  // RELATIONS

  @ManyToOne(() => BreedModel, (breed) => breed.cats)
  @JoinColumn({ name: 'breedId' })
  breed: BreedModel;

  // breedId: number;
}
