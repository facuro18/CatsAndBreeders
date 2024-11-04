import { ValidRoles } from '@modules/shared/constants/roles';

export interface JwtPayload {
  userId: number;
  email: string;
  roles: ValidRoles[];
}
