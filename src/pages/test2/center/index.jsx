import "./index.scss";
import { useDrop } from "react-dnd";
import { useEffect, useState } from "react";
import Context from "../../../redux/store";
import { useContext } from "react";
import { RIGHT_PANEL_TYPE, COMPONENT_TYPE } from "../../../redux/constants";
function Center() {
  const { state, dispatch } = useContext(Context);
  const { data } = state;
  const [div_X, setDiv_X] = useState(0);
  const [div_Y, setDiv_Y] = useState(0);
  const [, droper] = useDrop({
    // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
    accept: "component",
    drop: (item, minoter) => {
      const { x, y } = minoter.getClientOffset();
      const currentX = x - div_X;
      const currentY = y - div_Y;
      if (item.tag === "text") {
        const newdata = [
          ...data,
          {
            id: `text-${data.length + 1}`,
            type: "text",
            data: "我是新建的文字",
            color: "#000000",
            size: "12px",
            width: "100px",
            height: "20px",
            left: `${currentX}px`,
            top: `${currentY}px`,
          },
        ];
        dispatch({ type: "SETDATA", data: newdata });
      } else if (item.tag === COMPONENT_TYPE.IMAGE) {
        const newdata = [
          ...data,
          {
            id: `image-${data.length + 1}`,
            type: "image",
            src: "",
            width: "100px",
            height: "100px",
            left: `${currentX}px`,
            top: `${currentY}px`,
          },
        ];
        dispatch({ type: "SETDATA", data: newdata });
      }
    },
    // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
    collect: (minoter, props) => {
      return {
        isOver: minoter.isOver(),
        minoter: minoter.inter,
      };
    },
  });

  const generateContent = () => {
    const output = [];
    for (const item of data) {
      if (item.type === COMPONENT_TYPE.TEXT) {
        output.push(
          <div
            key={item.id}
            onClick={() => {
              dispatch({
                type: "setRightPanelType",
                rightPanelType: RIGHT_PANEL_TYPE.TEXT,
              });
              dispatch({
                type: "setRightPanelElementId",
                RightPanelElementId: item.id,
              });
            }}
            style={{
              color: item.color,
              fontSize: item.size,
              width: item.width,
              height: item.height,
              left: item.left,
              top: item.top,
              position: "absolute",
              backgroundColor: "#bbbbbb",
            }}
          >
            {item.data}
          </div>
        );
      } else if (item.type === COMPONENT_TYPE.IMAGE) {
        output.push(
          <img
            key={item.id}
            onClick={() => {
              dispatch({
                type: "setRightPanelType",
                rightPanelType: RIGHT_PANEL_TYPE.IMAGE,
              });
              dispatch({
                type: "setRightPanelElementId",
                RightPanelElementId: item.id,
              });
            }}
            alt="这是图片组件"
            src={item.src}
            style={{
              width: item.width,
              height: item.height,
              left: item.left,
              top: item.top,
              position: "absolute",
            }}
          ></img>
        );
      }
    }
    return output;
  };
  useEffect(() => {
    const test = document.querySelector(".test2_center");
    setDiv_X(test.offsetLeft);
    setDiv_Y(test.offsetTop);
  }, []);
  return (
    <div ref={droper} className="test2_center">
      {generateContent()}
    </div>
  );
}

export default Center;
