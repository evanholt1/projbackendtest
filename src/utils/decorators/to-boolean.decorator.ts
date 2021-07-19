import { Transform } from 'class-transformer';

/**
 * Decorator designed to be used in classes' properties
 * for usage with class-transformer.
 * As class-transformer does not do String -> Boolean conversion,
 * this decorator does this.
 * Good when using fields in @Query() or maybe others.
 * Example Usage is the 'pagination' boolean in Get requests inside @Query object.
 */

export function ToBoolean(): (target: any, key: string) => void {
  return Transform(({ value }) => value === 'true' || value === true);
}
