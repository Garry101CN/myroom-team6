import "./index.scss";
import { useDrop } from "react-dnd";
import { useEffect, useRef, useState } from "react";
import Context from "../../../redux/store";
import { useContext } from "react";
import { RIGHT_PANEL_TYPE, COMPONENT_TYPE } from "../../../redux/constants";
import { Card } from "antd";
import { Player } from "video-react";
import classnames from "classnames";
function Center() {
  const videoRef = useRef();
  const { state, dispatch } = useContext(Context);
  const Audioref = useRef();
  const { data, rightPanelElementId } = state;
  const [div_X, setDiv_X] = useState(0);
  const [div_Y, setDiv_Y] = useState(0);
  const [, droper] = useDrop({
    // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
    accept: "component",
    drop: async (item, minoter) => {
      const { x, y } = minoter.getClientOffset();
      console.log(div_X, div_Y);
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
            id: `audio-${data.length + 1}`,
            type: "audio",
            src: "",
            width: "",
            height: "",
            left: `${currentX}px`,
            top: `${currentY}px`,
          },
        ];
        dispatch({ type: "SETDATA", data: newdata });
      } else if (item.tag === COMPONENT_TYPE.CARD) {
        const newdata = [
          ...data,
          {
            id: `card-${data.length + 1}`,
            type: "card",
            src:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F121006%2F219049-12100616021661.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655814591&t=521347d9a7ae2769eeab04667ae906c3",
            width_img: "100%",
            height_img: "200px",
            width: "100%",
            height: "",
            left: `${0}px`,
            top: `${currentY}px`,
            name: "房源信息",
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
      } else if (item.tag === COMPONENT_TYPE.VIDEO) {
        const newdata = [
          ...data,
          {
            id: `video-${data.length + 1}`,
            type: "video",
            src: "",
            width: "100%",
            height: "",
            left: "0px",
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
            className={classnames({
              border_move: item.id === rightPanelElementId,
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
              border_move: item.id === rightPanelElementId,
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
        const { top, left, width, height, src, id } = item;
        output.push(
          <div
            // eslint-disable-next-line no-loop-func

            className={classnames({
              border_move: item.id === rightPanelElementId,
            })}
            key={id}
            style={{
              left: left,
              top: top,
              position: "absolute",
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();

                dispatch({
                  type: "setRightPanelType",
                  rightPanelType: RIGHT_PANEL_TYPE.AUDIO,
                });
                dispatch({
                  type: "setRightPanelElementId",
                  RightPanelElementId: id,
                });
              }}
              className="audio_mask"
            ></div>
            <audio
              ref={Audioref}
              style={{ width: width, height: height }}
              controls
              src={src}
            ></audio>
          </div>
        );
      } else if (item.type === COMPONENT_TYPE.VIDEO) {
        const { src, width, id, top, left } = item;

        output.push(
          <div
            key={id}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({
                type: "setRightPanelType",
                rightPanelType: RIGHT_PANEL_TYPE.VIDEO,
              });
              dispatch({
                type: "setRightPanelElementId",
                RightPanelElementId: item.id,
              });
            }}
            style={{ width: width, position: "absolute", left: left, top: top }}
          >
            <Player ref={videoRef} src={src} id="myvideo" controls></Player>
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
        dispatch({
          type: "setRightPanelElementId",
          RightPanelElementId: "",
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
