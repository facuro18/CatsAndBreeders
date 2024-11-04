import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserModel {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  roles: string;
  //"ADMIN,USER"
}
