import React from "react";
import { useDrag } from "react-dnd";

import "./index.scss";

export default function TextComponent() {
  const [, drag] = useDrag(() => ({
    type: "component",
    item: {
      tag: "text",
    },
  }));
  return (
    <div style={{ cursor: "move" }} className="text-component" ref={drag}>
      文字组件
    </div>
  );
}
