import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/utils/enums/role.enum';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (
      !requiredRoles ||
      requiredRoles.length == 0 ||
      requiredRoles[0] == Role.All
    ) {
      return true;
    }
    const { user }: { user: User } = context.switchToHttp().getRequest();
    // logToConsole({ prepend: 'roles', object: requiredRoles });
    // logToConsole({ prepend: 'user type', object: typeof user });
    // logToConsole({ prepend: 'user', object: user });
    // logToConsole({
    //   prepend: 'rolesIncludesUser',
    //   object: requiredRoles.includes(user.role),
    // });
    return requiredRoles.includes(user.role);
    //return matchRoles(roles, user.roles);
  }
}
