import Context from "../../../redux/store";
import { useContext, useEffect, useState } from "react";
import { RIGHT_PANEL_TYPE } from "../../../redux/constants";
import "./index.scss";
import { Input, Form, Button, Space, message } from "antd";
function Right() {
  const { state, dispatch } = useContext(Context);
  const { data, rightPanelType, rightPanelElementId } = state;
  const [privateData, setprivateData] = useState(<div></div>);
  //用于接受audio的组件
  let currentData;
  const onFinish = (values) => {
    for (let item of data) {
      if (item.id === rightPanelElementId) {
        for (let key in values) {
          item[key] = values[key];
        }
      }
    }
    dispatch({ type: "SETDATA", data: data });
  };

  const onFinishAudio = (values) => {
    for (let item of data) {
      if (item.id === rightPanelElementId) {
        for (let key in values) {
          item[key] = values[key];
        }
        item.src = currentData;
      }
    }
    dispatch({ type: "SETDATA", data: data });
  };
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
    if (rightPanelType === RIGHT_PANEL_TYPE.NONE) {
      setprivateData(<div>未选中元素</div>);
      return;
    } else if (rightPanelType === RIGHT_PANEL_TYPE.TEXT) {
      const elementData = findCurrentElement(rightPanelElementId);

      setprivateData(
        <div>
          <Form
            name="basic"
            style={{ margin: 30 }}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              data: elementData.data,
              color: elementData.color,
              size: elementData.size,
              width: elementData.width,
              height: elementData.height,
              left: elementData.left,
              top: elementData.top,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="内容"
              name="data"
              rules={[{ message: "请输入内容" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="颜色:"
              name="color"
              rules={[{ message: "请输入文本颜色" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="大小:"
              name="size"
              rules={[{ message: "请输入文本大小" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="高度"
              name="height"
              rules={[{ message: "请输入文本高度" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="宽度"
              name="width"
              rules={[{ message: "请输入文本宽度" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="top" name="top" rules={[{}]}>
              <Input />
            </Form.Item>
            <Form.Item label="left" name="left" rules={[{}]}>
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>

                <Button
                  type="primary"
                  onClick={() => {
                    dispatch({
                      type: "deleteComponent",
                      rightPanelElementId: rightPanelElementId,
                    });
                    dispatch({
                      type: "setRightPanelType",
                      rightPanelType: RIGHT_PANEL_TYPE.NONE,
                    });
                  }}
                >
                  撤销该组件
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      );
    } else if (rightPanelType === RIGHT_PANEL_TYPE.IMAGE) {
      const elementData = findCurrentElement(rightPanelElementId);

      setprivateData(
        <div>
          <Form
            name="basic"
            style={{ margin: 30 }}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              src: elementData.src,
              width: elementData.width,
              height: elementData.height,
              left: elementData.left,
              top: elementData.top,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="高度"
              name="height"
              rules={[{ message: "请输入文本高度" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="宽度"
              name="width"
              rules={[{ message: "请输入文本宽度" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="src"
              name="src"
              rules={[{ message: "请输入src" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="top" name="top" rules={[{}]}>
              <Input />
            </Form.Item>
            <Form.Item label="left" name="left" rules={[{}]}>
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>

                <Button
                  type="primary"
                  onClick={() => {
                    dispatch({
                      type: "deleteComponent",
                      rightPanelElementId: rightPanelElementId,
                    });
                    dispatch({
                      type: "setRightPanelType",
                      rightPanelType: RIGHT_PANEL_TYPE.NONE,
                    });
                  }}
                >
                  撤销该组件
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      );
    } else if (rightPanelType === "audio") {
      const elementData = findCurrentElement(rightPanelElementId);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      const record = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=h264",
      });

      record.ondataavailable = (e) => {
        currentData = URL.createObjectURL(new Blob([e.data]));
      };

      setprivateData(
        <div>
          <Form
            name="basic"
            style={{ margin: 30 }}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              width: elementData.width,
              height: elementData.height,
              left: elementData.left,
              top: elementData.top,
            }}
            onFinish={onFinishAudio}
            autoComplete="off"
          >
            <Form.Item label="高度" name="height">
              <Input />
            </Form.Item>

            <Form.Item label="宽度" name="width">
              <Input />
            </Form.Item>

            <Form.Item label="top" name="top" rules={[{}]}>
              <Input />
            </Form.Item>
            <Form.Item label="left" name="left" rules={[{}]}>
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>

                <Button
                  type="primary"
                  onClick={() => {
                    dispatch({
                      type: "deleteComponent",
                      rightPanelElementId: rightPanelElementId,
                    });
                    dispatch({
                      type: "setRightPanelType",
                      rightPanelType: RIGHT_PANEL_TYPE.NONE,
                    });
                  }}
                >
                  撤销该组件
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <div></div>
          <h3 style={{ marginLeft: 30 }}>录音</h3>
          <Space style={{ marginLeft: 100 }}>
            <Button
              type="primary"
              onClick={() => {
                record.start();
                message.info("开始录音");
              }}
            >
              开始录音
            </Button>
            <Button
              type="primary"
              onClick={() => {
                record.stop();
                message.info("录音中止");
              }}
            >
              中止录音
            </Button>
          </Space>
        </div>
        // <div key={rightPanelElementId}>
        //   <div>音频元素</div>
        //   <br />

        //   <div className="flex-row-space-between text-config-item">
        //     <div>width:</div>
        //     <input
        //       defaultValue={elementData.width}
        //       ref={(element) => {
        //         inputDomObject[0] = element;
        //       }}
        //       type="text"
        //     ></input>
        //   </div>
        //   <div className="flex-row-space-between text-config-item">
        //     <div>height:</div>
        //     <input
        //       defaultValue={elementData.height}
        //       ref={(element) => {
        //         inputDomObject[1] = element;
        //       }}
        //       type="text"
        //     ></input>
        //   </div>

        //   <div className="flex-row-space-between text-config-item">
        //     <div>top:</div>
        //     <input
        //       defaultValue={elementData.top}
        //       ref={(element) => {
        //         inputDomObject[3] = element;
        //       }}
        //       type="text"
        //     ></input>
        //   </div>
        //   <div className="flex-row-space-between text-config-item">
        //     <div>left:</div>
        //     <input
        //       defaultValue={elementData.left}
        //       ref={(element) => {
        //         inputDomObject[4] = element;
        //       }}
        //       type="text"
        //     ></input>
        //   </div>
        //   <br />

        //   <button
        //     onClick={() => {
        //       findCurrentElementAndChangeData(
        //         rightPanelElementId,
        //         "width",
        //         inputDomObject[0].value
        //       );
        //       findCurrentElementAndChangeData(
        //         rightPanelElementId,
        //         "height",
        //         inputDomObject[1].value
        //       );
        //       findCurrentElementAndChangeData(
        //         rightPanelElementId,
        //         "src",
        //         currentData
        //       );
        //       findCurrentElementAndChangeData(
        //         rightPanelElementId,
        //         "top",
        //         inputDomObject[3].value
        //       );
        //       findCurrentElementAndChangeData(
        //         rightPanelElementId,
        //         "left",
        //         inputDomObject[4].value
        //       );
        //     }}
        //   >
        //     确定
        //   </button>
        // </div>
      );
    }
  };
  useEffect(() => {
    generateRightPanel();
  }, [data, rightPanelType, rightPanelElementId]);

  return <div className="right">{privateData}</div>;
}

export default Right;
