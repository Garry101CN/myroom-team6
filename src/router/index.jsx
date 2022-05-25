import Info from "../pages/agent_info";
import Login from "../pages/agent_login";
import ItemLists from "../pages/agent_itemLists";
import RouteError from "../pages/Error";
import User from "../pages/agent_user";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "../pages/agent_editor";
import ItemsAndUser from "../pages/agent_user_item";
import Register from "../pages/agent_register";

/**
 * 路由组件，新页面在此添加
 */
const BaseRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Editor />}></Route>
        <Route path="/userAndItem" element={<ItemsAndUser />}>
          <Route path="user" element={<User />}></Route>
          <Route index path="itemLists" element={<ItemLists />}></Route>
        </Route>
        <Route path="/info" children element={<Info />}></Route>
        <Route path="/login" children element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<RouteError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRouter;
