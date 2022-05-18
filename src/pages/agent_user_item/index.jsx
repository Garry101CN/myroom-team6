import { useState, React } from "react";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import "./index.scss";
import { Outlet } from "react-router-dom";

const items = [
  {
    label: "项目列表",
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: "个人信息",
    key: "app",
    icon: <AppstoreOutlined />,
  },
];

function ItemsAndUser() {
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
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
      <span className="itemUser_name">用户名</span>
      <Outlet />
    </div>
  );
}

export default ItemsAndUser;
