// import { useContext } from "react";
// import Context from "../../redux/store";
// import { add } from "../../redux/func";
// import { sub } from "../../redux/func";
import Box from "./components/box";
import Dustbin from "./components/dustbin";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function Home() {
  // const { state, dispatch } = useContext(Context);
  return (
    <DndProvider backend={HTML5Backend}>
      {/* 这是经纪人Home(根)页面
      <button onClick={() => dispatch(add(2))}>增加2点击次数</button>
      <button onClick={() => dispatch(sub(2))}>减少2点击次数</button>
      <div>当前点击次数：{state.count}</div> */}
      <Box />
      <Dustbin />
    </DndProvider>
  );
}

export default Home;
