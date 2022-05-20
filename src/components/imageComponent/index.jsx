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
        className="component_image"
        src="https://fc1tn.baidu.com/it/u=3370372160,683374326&fm=202&mola=new&crop=v1"
        alt="这是图片组件"
        ref={drag}
      ></img>
    </div>
  );
}

export default ImageComponent;
