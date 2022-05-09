export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, count: state.count + action.arg };
    case "SUB":
      return { ...state, count: state.count - action.arg };
    default:
      return { ...state };
  }
};
