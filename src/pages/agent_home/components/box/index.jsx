import { useDrag } from "react-dnd";
import "./index.scss";
const Box = () => {
  const [, drager] = useDrag({
    item: {},
    type: "Box",
  });
  return (
    <div className="box" ref={drager}>
      可拖拽组件
    </div>
  );
};

export default Box;
