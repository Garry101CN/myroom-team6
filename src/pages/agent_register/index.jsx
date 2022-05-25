import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { reqRegister } from "../../utils/ajax_uitis";
import { useRef } from "react";

function Register() {
  const navigate = useNavigate();
  const zhanghaoRef = useRef();
  const passwordRef = useRef();
  const register = async () => {
    const name = zhanghaoRef.current.input.value;
    const password = passwordRef.current.input.value;
    if (name.trim() === "" || password.trim() === "") {
      message.error("用户名或者密码不能为空");
      return;
    }
    const res = await reqRegister(name, password);
    if (res.ret) {
      message.success("注册成功，快去登录吧~");
      navigate("/login");
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
          <Button onClick={register} className="bg_group_login" type="primary">
            注册
          </Button>
          <div onClick={() => navigate("/login")} className="bg_group_register">
            已有账号？点此去登录
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
