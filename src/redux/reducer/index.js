import { initState } from "../constants";

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
    case "deleteComponent":
      const res = [];
      state.data.forEach((item) => {
        if (item.id !== action.rightPanelElementId) {
          res.push(item);
        }
      });
      return { ...state, data: res };
    case "reset":
      console.log("reset");
      return { ...initState };
    default:
      return { ...state };
  }
};
