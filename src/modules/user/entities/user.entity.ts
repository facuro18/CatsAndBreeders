import { ValidRoles } from '@modules/shared/constants/roles';

export class UserEntity {
  id?: number;
  name: string;
  email: string;
  password: string;
  roles: ValidRoles[];

  constructor(init: Partial<UserEntity>) {
    Object.assign(this, init);
  }
}
