export const add = (arg) => {
  return { type: "ADD", arg: arg };
};
export const sub = (arg) => {
  return { type: "SUB", arg: arg };
};

export const setPosition = (arg) => {
  return { type: "POSITION", arg: arg };
};
