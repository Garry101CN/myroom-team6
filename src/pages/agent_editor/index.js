import Left from "./left";
import Center from "./center";
import Right from "./right";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useEffect } from "react";
function Test2() {
  const nav = useNavigate();
  // const {state,dispatch}=useContext(Context)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      message.info("您还未登录或者登录过期，请重新登录");
      nav("/login");
    }
  }, []);

  return (
    <div className="test2">
      <Left />
      <Center />
      <Right />
    </div>
  );
}

export default Test2;
