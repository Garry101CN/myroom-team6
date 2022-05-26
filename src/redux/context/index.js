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
  ],
  rightPanelType: RIGHT_PANEL_TYPE.PANEL,
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


