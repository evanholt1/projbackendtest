export const logToConsole = ({ prepend, object }) => {
  console.log(`${prepend}\n${JSON.stringify(object)}\n`);
};
