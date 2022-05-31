import Left from "./left";
import Center from "./center";
import Right from "./right";
import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { useEffect } from "react";
function Test2() {
  const nav = useNavigate();
  const location = useLocation();
  let Id = null;
  let projectId = null;
  console.log(location);
  if (location.state) {
    if (location.state.id) {
      console.log("test");

      Id = location.state.id;
    }
    if (location.state.projectId) {
      projectId = location.state.projectId;
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      message.info("您还未登录或者登录过期，请重新登录");
      nav("/login");
    }
  }, []);

  return (
    <div className="test2">
      <Left Id={Id} projectId={projectId} />
      <Center Id={Id} />
      <Right />
    </div>
  );
}

export default Test2;
