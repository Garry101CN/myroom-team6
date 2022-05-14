import React from "react";
import { useDrag } from "react-dnd";
import { COMPONENT_TYPE } from "../../redux/constants";
import "./index.scss";
function ImageComponent() {
  const [, drag] = useDrag(() => ({
    type: "component",
    item: {
      tag: COMPONENT_TYPE.IMAGE,
    },
  }));
  return (
    <div>
      <img
        src=""
        alt="这是图片组件"
        style={{ cursor: "move", height: 50, width: 50 }}
        ref={drag}
      ></img>
    </div>
  );
}

export default ImageComponent;
