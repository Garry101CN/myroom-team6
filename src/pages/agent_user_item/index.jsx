import { Menu } from "antd";

import "./index.scss";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
// <Route index element={<ItemLists />}></Route>
// <Route path="/person" element={<User />}></Route>
// <Route path="/editor" element={<Editor />}></Route>
// <Route path="/info" children element={<Info />}></Route>
// <Route path="/login" children element={<Login />}></Route>
// <Route path="/register" element={<Register />}></Route>
const items = [
  {
    label: "已制作活动页列表",
    key: "/",
  },
  {
    label: "在线用户",
    key: "/person",
  },
  {
    label: "项目列表",
    key: "/detailPage",
  },
  {
    label: "个人信息",
    key: "/info",
  },
  {
    label: "登录/注册",
    key: "/login",
  },
];

function ItemsAndUser() {
  const nav = useNavigate();
  const location = useLocation();

  const onClick = (e) => {
    nav(e.key);
  };

  return (
    <div className="itemLists">
      <Menu
        className="itemLists_menu"
        theme="dark"
        onClick={onClick}
        selectedKeys={[location.pathname]}
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
