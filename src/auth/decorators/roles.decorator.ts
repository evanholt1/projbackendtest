import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/utils/enums/role.enum';

// if you want to allow any logged in user, pass @Roles().
// this is due to a rolesGuard if check.
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
