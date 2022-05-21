import React, { useReducer } from "react";
import { reducer } from "../reducer";
import Context from "../store";
import { RIGHT_PANEL_TYPE } from "../constants";

const initState = {
  data: [
    {
      id: "panel",
      type: "panel",
      width: "400px",
      height: "100vh",
      backgroundColor: "white",
    },
    {
      id: "text-2",
      type: "text",
      data: "我是 2 号文字",
      color: "#00FF00",
      size: "12px",
      width: "100px",
      height: "20px",
      left: "100px",
      top: "150px",
    },
  ],
  rightPanelType: RIGHT_PANEL_TYPE.NONE,
  rightPanelElementId: "",
};
const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
export default ContextProvider;

// {
//   id: "text-1",
//   type: "text",
//   data: "我是 1 号文字",
//   color: "#FF0000",
//   size: "12px",
//   width: "100px",
//   height: "20px",
//   left: "100px",
//   top: "100px",
// },
