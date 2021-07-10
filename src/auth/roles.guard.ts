import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  allowedRoles: string[];
  allowAll: boolean;
  //constructor(readonly allowedRoles: string[], readonly allowAll?: boolean) {}
  constructor({ allowedRoles = [] as string[], allowAll = false }) {
    this.allowedRoles = allowedRoles;
    this.allowAll = allowAll;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      this.allowAll === true ||
      this.allowedRoles.includes(request.user.userRole)
    )
      return true;
    else return false;
  }
}
