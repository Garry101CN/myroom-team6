import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { reqLogin } from "../../utils/ajax_uitis";
import { useRef } from "react";

function Login() {
  const navigate = useNavigate();
  const zhanghaoRef = useRef();
  const passwordRef = useRef();
  const login = async () => {
    const name = zhanghaoRef.current.input.value;
    const password = passwordRef.current.input.value;
    if (name.trim() === "" || password.trim() === "") {
      message.error("用户名或者密码不能为空");
      return;
    }
    const res = await reqLogin(name, password);
    console.log(res);

    if (res.ret) {
      message.success(`欢迎您,${name}`);
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", name);
      navigate("/");
    } else {
      message.error("账号或者密码错误");
    }
  };
  return (
    <div className="login">
      <div className="bg">
        <div className="bg_title">MyRoom系统</div>
        <div className="bg_group">
          <Input
            ref={zhanghaoRef}
            style={{ marginBottom: 30 }}
            size="large"
            placeholder="账号"
            prefix={<UserOutlined />}
          />
          <Input.Password
            ref={passwordRef}
            prefix={<LockOutlined />}
            size="large"
            placeholder="密码"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button onClick={login} className="bg_group_login" type="primary">
            登录
          </Button>
          <div
            onClick={() => navigate("/register")}
            className="bg_group_register"
          >
            点此注册账号
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
