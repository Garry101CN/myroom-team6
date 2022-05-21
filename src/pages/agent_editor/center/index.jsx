import "./index.scss";
import { useDrop } from "react-dnd";
import { useEffect, useState } from "react";
import Context from "../../../redux/store";
import { useContext } from "react";
import { RIGHT_PANEL_TYPE, COMPONENT_TYPE } from "../../../redux/constants";
import { Card } from "antd";
import classnames from "classnames";
function Center() {
  const { state, dispatch } = useContext(Context);
  const { data } = state;
  const [div_X, setDiv_X] = useState(0);
  const [div_Y, setDiv_Y] = useState(0);
  const [, droper] = useDrop({
    // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
    accept: "component",
    drop: async (item, minoter) => {
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
            src:
              "https://fc1tn.baidu.com/it/u=3370372160,683374326&fm=202&mola=new&crop=v1",
            width: "100px",
            height: "100px",
            left: `${currentX}px`,
            top: `${currentY}px`,
          },
        ];
        dispatch({ type: "SETDATA", data: newdata });
      } else if (item.tag === COMPONENT_TYPE.AUDIO) {
        const newdata = [
          ...data,
          {
            id: `audio-${data.length - 1}`,
            type: "audio",
            src: "",
            width: "300px",
            height: "100px",
            left: `${currentX}px`,
            top: `${currentY}px`,
          },
        ];
        dispatch({ type: "SETDATA", data: newdata });
      } else if (item.tag === COMPONENT_TYPE.CARD) {
        const newdata = [
          ...data,
          {
            id: `card-${data.length - 1}`,
            type: "card",
            src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
            width_img: "100%",
            height_img: "200px",
            width: "100%",
            height: "",
            left: `${0}`,
            top: `${currentY}`,
            name: "这是房源名称",
            soujia: "xxx",
            guapai: "xxx",
            fangxing: "xx室xx厅",
            zhuangxiu: "xx",
            mianji: "xx",
            louxing: "xxx",
            chaoxiang: "xxx",
            niandai: "xxx",
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
            className={classnames({
              border_move: item.id === state.rightPanelElementId,
            })}
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
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
            className={classnames({
              border_move: item.id === state.rightPanelElementId,
            })}
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
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
      } else if (item.type === COMPONENT_TYPE.AUDIO) {
        output.push(
          <div
            className={classnames({
              border_move: item.id === state.rightPanelElementId,
            })}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({
                type: "setRightPanelType",
                rightPanelType: RIGHT_PANEL_TYPE.AUDIO,
              });
              dispatch({
                type: "setRightPanelElementId",
                RightPanelElementId: item.id,
              });
            }}
            key={item.id}
            style={{
              width: item.width,
              height: item.height,
              left: item.left,
              top: item.top,
              position: "absolute",
            }}
          >
            <audio
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: "setRightPanelType",
                  rightPanelType: RIGHT_PANEL_TYPE.AUDIO,
                });
                dispatch({
                  type: "setRightPanelElementId",
                  RightPanelElementId: item.id,
                });
              }}
              controls
              src={item.src}
            ></audio>
          </div>
        );
      } else if (item.type === COMPONENT_TYPE.CARD) {
        const {
          name,
          id,
          left,
          top,
          width,
          height,
          width_img,
          height_img,
          src,
          soujia,
          guapai,
          fangxing,
          zhuangxiu,
          mianji,
          louxing,
          chaoxiang,
          niandai,
        } = item;
        output.push(
          <Card
            onClick={(e) => {
              e.stopPropagation();
              dispatch({
                type: "setRightPanelType",
                rightPanelType: RIGHT_PANEL_TYPE.CARD,
              });
              dispatch({
                type: "setRightPanelElementId",
                RightPanelElementId: id,
              });
            }}
            key={id}
            style={{
              position: "absolute",
              left: left,
              top: top,
              width: width,
              height: height,
            }}
            hoverable
            cover={
              <img
                style={{ width: width_img, height: height_img }}
                className="card_img"
                alt="example"
                src={src}
              />
            }
          >
            <h2>{name}</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "spaceAround",
                alignItems: "center",
              }}
            >
              <div style={{ width: "40%", textAlign: "center" }}>
                售价:{soujia}
              </div>
              <div style={{ width: "40%", textAlign: "center" }}>
                挂牌:{guapai}
              </div>
              <div style={{ width: "40%", textAlign: "center" }}>
                房型:{fangxing}
              </div>
              <div style={{ width: "40%", textAlign: "center" }}>
                装修:{zhuangxiu}
              </div>
              <div style={{ width: "40%", textAlign: "center" }}>
                面积:{mianji}
              </div>
              <div style={{ width: "40%", textAlign: "center" }}>
                楼型:{louxing}
              </div>
              <div style={{ width: "40%", textAlign: "center" }}>
                朝向:{chaoxiang}
              </div>
              <div style={{ width: "40%", textAlign: "center" }}>
                年代:{niandai}
              </div>
            </div>
          </Card>
        );
      }
    }
    return output;
  };
  const getPanelStyle = () => {
    for (let item of data) {
      if (item.id === "panel") {
        return item;
      }
    }
  };
  useEffect(() => {
    const test = document.querySelector(".test2_center");
    setDiv_X(test.offsetLeft);
    setDiv_Y(test.offsetTop);
  }, []);
  return (
    <div
      onClick={() => {
        dispatch({
          type: "setRightPanelType",
          rightPanelType: RIGHT_PANEL_TYPE.PANEL,
        });
      }}
      style={{ ...getPanelStyle() }}
      ref={droper}
      className="test2_center"
    >
      {generateContent()}
    </div>
  );
}

export default Center;
