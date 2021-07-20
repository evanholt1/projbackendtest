/**
 * Capitalizes the first letter in a string. used for Role enum
 * as a فزلكة
 * @param {String} role
 * @returns {String} - the same string with the first letter capitalized
 */

export function capitaliseFirstLetter(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}
