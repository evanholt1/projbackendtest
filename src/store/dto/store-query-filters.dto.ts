import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Store } from '../schemas/store.schema';

export class StoreQueryFiltersDto extends PartialType(Store) {}
