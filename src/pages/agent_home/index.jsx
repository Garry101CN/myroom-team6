import { useContext } from "react";
import Context from "../../redux/store";
import { add } from "../../redux/func";
import { sub } from "../../redux/func";
function Home() {
  const { state, dispatch } = useContext(Context);
  return (
    <div>
      这是经纪人Home(根)页面
      <button onClick={() => dispatch(add(2))}>增加2点击次数</button>
      <button onClick={() => dispatch(sub(2))}>减少2点击次数</button>
      <div>当前点击次数：{state.count}</div>
    </div>
  );
}

export default Home;
