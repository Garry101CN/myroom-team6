import React from "react";
import { useDrag } from "react-dnd";
import { COMPONENT_TYPE } from "../../redux/constants";
import "./index.scss";
function AudioComponent() {
  const [, drag] = useDrag(() => ({
    type: "component",
    item: {
      tag: COMPONENT_TYPE.AUDIO,
    },
  }));
  return (
    <div ref={drag} style={{ cursor: "move", marginBottom: 10 }}>
      <audio controls></audio>
    </div>
  );
}

export default AudioComponent;
