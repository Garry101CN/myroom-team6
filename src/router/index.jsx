import Info from "../pages/agent_info";
import Login from "../pages/agent_login";
import ItemLists from "../pages/agent_itemLists";
import RouteError from "../pages/Error";
import User from "../pages/agent_user";
import Home from "../pages/agent_home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/**
 * 路由组件，新页面在此添加
 */
const BaseRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/info" children element={<Info />}></Route>
        <Route path="/itemLists" children element={<ItemLists />}></Route>
        <Route path="/login" children element={<Login />}></Route>
        <Route path="/user" children element={<User />}></Route>
        <Route path="*" element={<RouteError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRouter;
