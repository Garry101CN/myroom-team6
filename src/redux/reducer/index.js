export const reducer = (state, action) => {
  switch (action.type) {
    case "SETDATA":
      return { ...state, data: action.data };
    case "setRightPanelType":
      return { ...state, rightPanelType: action.rightPanelType };
    case "setRightPanelElementId":
      return { ...state, rightPanelElementId: action.RightPanelElementId };
    case "mouse":
      return { ...state };
    default:
      return { ...state };
  }
};
