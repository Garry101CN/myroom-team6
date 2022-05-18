import Info from "../pages/agent_info";
import Login from "../pages/agent_login";
import ItemLists from "../pages/agent_itemLists";
import RouteError from "../pages/Error";
import User from "../pages/agent_user";
import Home from "../pages/agent_home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "../pages/agent_home/components/box";
import Test from "../pages/test";
import Test2 from "../pages/test2";
import ItemsAndUser from "../pages/agent_user_item";

/**
 * 路由组件，新页面在此添加
 */
const BaseRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/box" children element={<Box />}></Route>
        <Route path="/userAndItem" element={<ItemsAndUser />}>
          <Route path="user" element={<User />}></Route>
          <Route index path="itemLists" element={<ItemLists />}></Route>
        </Route>
        <Route path="/info" children element={<Info />}></Route>
        <Route path="/login" children element={<Login />}></Route>
        <Route path="/test" children element={<Test />}></Route>
        <Route path="/test2" element={<Test2 />}></Route>
        <Route path="*" element={<RouteError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRouter;
