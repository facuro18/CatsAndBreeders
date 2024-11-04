import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '@modules/shared/constants/roles';

export const ROLES = 'roles';
export const RoleGuardDecorator = (...roles: ValidRoles[]) => SetMetadata(ROLES, roles);
