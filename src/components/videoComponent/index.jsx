import React from "react";
import { useDrag } from "react-dnd";
import { COMPONENT_TYPE } from "../../redux/constants";
import "./index.scss";
function VideoComponent() {
  const [, drag] = useDrag(() => ({
    type: "component",
    item: {
      tag: COMPONENT_TYPE.VIDEO,
    },
  }));
  return (
    <div ref={drag} style={{ cursor: "move" }}>
      <video controls></video>
    </div>
  );
}

export default VideoComponent;
