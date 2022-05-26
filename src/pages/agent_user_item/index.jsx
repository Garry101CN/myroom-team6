import { useState, React } from "react";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import "./index.scss";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// <Route index element={<ItemLists />}></Route>
// <Route path="/person" element={<User />}></Route>
// <Route path="/editor" element={<Editor />}></Route>
// <Route path="/info" children element={<Info />}></Route>
// <Route path="/login" children element={<Login />}></Route>
// <Route path="/register" element={<Register />}></Route>
const items = [
  {
    label: "项目列表",
    key: "",
  },
  {
    label: "在线用户",
    key: "person",
  },
  {
    label: "编辑器页",
    key: "editor",
  },
  {
    label: "个人信息",
    key: "info",
  },
  {
    label: "登录/注册",
    key: "login",
  },
];

function ItemsAndUser() {
  const nav = useNavigate();
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    nav(e.key);
  };

  return (
    <div className="itemLists">
      <Menu
        className="itemLists_menu"
        theme="dark"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <span className="itemUsers_logo"> MyRoom</span>
      <span className="itemUser_name">{localStorage.getItem("username")}</span>
      <Outlet />
    </div>
  );
}

export default ItemsAndUser;
