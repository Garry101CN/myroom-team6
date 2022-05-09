import React, { useReducer } from "react";
import { reducer } from "../reducer";
import Context from "../store";

const initState = { count: 1 };
const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
export default ContextProvider;
