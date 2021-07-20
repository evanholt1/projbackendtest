export function setFieldToSortBy(options: Object, sortProperty: string): void {
  Object.assign(options, { sort: { [sortProperty]: -1 } });
}
