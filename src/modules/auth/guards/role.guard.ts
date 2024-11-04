import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../decorators/has-roles.decorator';
import { ValidRoles } from '@modules/shared/constants/roles';

export class GetUserContext {
  username: string;
  roles: ValidRoles[];
}
export class RoleGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    const reflector = new Reflector();
    const roles = reflector.getAllAndOverride<ValidRoles[]>(ROLES, [context.getClass(), context.getHandler()]);

    if (!roles) return true;

    const { user } = context.switchToHttp().getRequest();

    const canActive = roles.some((role) => user.roles?.includes(role));
    return canActive;
  }
}
