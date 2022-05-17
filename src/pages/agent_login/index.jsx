import { Input, Button } from "antd";
import "./index.scss";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
function Login() {
  return (
    <div className="login">
      <div className="bg">
        <div className="bg_title">MyRoom系统</div>
        <div className="bg_group">
          <Input
            style={{ marginBottom: 30 }}
            size="large"
            placeholder="账号"
            prefix={<UserOutlined />}
          />
          <Input.Password
            prefix={<LockOutlined />}
            size="large"
            placeholder="密码"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Button className="bg_group_login" type="primary">
            登录
          </Button>
          <div className="bg_group_register">点此注册账号</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
