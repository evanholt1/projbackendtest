/**
 * function that sets the 'lean' option in mongoose .find()
 * to 'true'.
 */

export function addLeanOption(options: Object) {
  Object.assign(options, { lean: true });
}
