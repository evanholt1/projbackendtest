import { SetMetadata } from '@nestjs/common';

// passes anything through jwt validation. differnt from @Roles().
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
