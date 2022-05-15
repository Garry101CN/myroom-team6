import Context from "../../../redux/store";
import { useContext, useEffect, useState } from "react";
import { RIGHT_PANEL_TYPE } from "../../../redux/constants";

function Right() {
  const { state, dispatch } = useContext(Context);
  const { data, rightPanelType, rightPanelElementId } = state;
  const [privateData, setprivateData] = useState(<div></div>);
  const findCurrentElement = (id) => {
    for (const item of data) {
      if (item.id === id) {
        return item;
      }
    }
    return undefined;
  };

  const findCurrentElementAndChangeData = (id, key, changeData) => {
    for (let item of data) {
      if (item.id === id) {
        item[key] = changeData;
      }
    }
    dispatch({ type: "SETDATA", data: data });
  };
  const generateRightPanel = async () => {
    console.log(rightPanelElementId);
    console.log(rightPanelType);
    if (rightPanelType === RIGHT_PANEL_TYPE.NONE) {
      setprivateData(<div>未选中元素</div>);
      return;
    } else if (rightPanelType === RIGHT_PANEL_TYPE.TEXT) {
      const elementData = findCurrentElement(rightPanelElementId);

      const inputDomObject = [];
      setprivateData(
        <div key={rightPanelElementId}>
          <div>文字元素</div>
          <br />
          <div className="flex-row-space-between text-config-item">
            <div>文字内容:</div>
            <input
              defaultValue={elementData.data}
              ref={(element) => {
                inputDomObject[0] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>文字颜色:</div>
            <input
              defaultValue={elementData.color}
              ref={(element) => {
                inputDomObject[1] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>文字大小:</div>
            <input
              defaultValue={elementData.size}
              ref={(element) => {
                inputDomObject[2] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>width:</div>
            <input
              defaultValue={elementData.width}
              ref={(element) => {
                inputDomObject[3] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>height:</div>
            <input
              defaultValue={elementData.height}
              ref={(element) => {
                inputDomObject[4] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>top:</div>
            <input
              defaultValue={elementData.top}
              ref={(element) => {
                inputDomObject[5] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>left:</div>
            <input
              defaultValue={elementData.left}
              ref={(element) => {
                inputDomObject[6] = element;
              }}
              type="text"
            ></input>
          </div>
          <br />
          <button
            onClick={() => {
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "data",
                inputDomObject[0].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "color",
                inputDomObject[1].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "size",
                inputDomObject[2].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "width",
                inputDomObject[3].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "height",
                inputDomObject[4].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "top",
                inputDomObject[5].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "left",
                inputDomObject[6].value
              );
            }}
          >
            确定
          </button>
        </div>
      );
    } else if (rightPanelType === RIGHT_PANEL_TYPE.IMAGE) {
      const elementData = findCurrentElement(rightPanelElementId);
      const inputDomObject = [];
      setprivateData(
        <div key={rightPanelElementId}>
          <div>图片元素</div>
          <br />

          <div className="flex-row-space-between text-config-item">
            <div>width:</div>
            <input
              defaultValue={elementData.width}
              ref={(element) => {
                inputDomObject[0] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>height:</div>
            <input
              defaultValue={elementData.height}
              ref={(element) => {
                inputDomObject[1] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>src:</div>
            <input
              defaultValue={elementData.src}
              ref={(element) => {
                inputDomObject[2] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>top:</div>
            <input
              defaultValue={elementData.top}
              ref={(element) => {
                inputDomObject[3] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>left:</div>
            <input
              defaultValue={elementData.left}
              ref={(element) => {
                inputDomObject[4] = element;
              }}
              type="text"
            ></input>
          </div>
          <br />
          <button
            onClick={() => {
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "width",
                inputDomObject[0].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "height",
                inputDomObject[1].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "src",
                inputDomObject[2].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "top",
                inputDomObject[3].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "left",
                inputDomObject[4].value
              );
            }}
          >
            确定
          </button>
        </div>
      );
    } else if (rightPanelType === "audio") {
      const elementData = findCurrentElement(rightPanelElementId);
      const inputDomObject = [];
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      const record = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=h264",
      });
      let currentData;
      record.ondataavailable = (e) => {
        console.log(e);
        currentData = URL.createObjectURL(new Blob([e.data]));
      };

      setprivateData(
        <div key={rightPanelElementId}>
          <div>音频元素</div>
          <br />

          <div className="flex-row-space-between text-config-item">
            <div>width:</div>
            <input
              defaultValue={elementData.width}
              ref={(element) => {
                inputDomObject[0] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>height:</div>
            <input
              defaultValue={elementData.height}
              ref={(element) => {
                inputDomObject[1] = element;
              }}
              type="text"
            ></input>
          </div>

          <div className="flex-row-space-between text-config-item">
            <div>top:</div>
            <input
              defaultValue={elementData.top}
              ref={(element) => {
                inputDomObject[3] = element;
              }}
              type="text"
            ></input>
          </div>
          <div className="flex-row-space-between text-config-item">
            <div>left:</div>
            <input
              defaultValue={elementData.left}
              ref={(element) => {
                inputDomObject[4] = element;
              }}
              type="text"
            ></input>
          </div>
          <br />
          <h4>此处可以录音</h4>

          <button onClick={() => record.start()}>开始录音</button>
          <button onClick={() => record.stop()}>中止录音</button>

          <button
            onClick={() => {
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "width",
                inputDomObject[0].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "height",
                inputDomObject[1].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "src",
                currentData
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "top",
                inputDomObject[3].value
              );
              findCurrentElementAndChangeData(
                rightPanelElementId,
                "left",
                inputDomObject[4].value
              );
            }}
          >
            确定
          </button>
        </div>
      );
    }
  };
  useEffect(() => {
    generateRightPanel();
  }, [data, rightPanelType, rightPanelElementId]);

  return <div>{privateData}</div>;
}

export default Right;
