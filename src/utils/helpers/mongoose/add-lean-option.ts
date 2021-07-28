/**
 * function that sets the 'lean' option in mongoose .find()
 * to 'true'.
 */

export function addLeanOption() {
  //Object.assign(options, { lean: true });
  return { lean: true };
}
