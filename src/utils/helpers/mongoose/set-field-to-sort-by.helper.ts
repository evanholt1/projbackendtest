// export function setFieldToSortBy(options: Object, sortProperty: string): void {
//   Object.assign(options, { sort: { [sortProperty]: -1 } });
// }
export function setFieldToSortBy(
  sortProperty: string,
): Record<string, unknown> {
  return { sort: { [sortProperty]: -1 } };
}
