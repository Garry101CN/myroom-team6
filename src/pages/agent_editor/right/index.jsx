import Context from "../../../redux/store";
import { useContext, useEffect, useState } from "react";
import { RIGHT_PANEL_TYPE } from "../../../redux/constants";
import "./index.scss";
import { Input, Form, Button, Space, message } from "antd";

function Right() {
  const { state, dispatch } = useContext(Context);
  const { data, rightPanelType, rightPanelElementId } = state;
  let record = "";
  const [privateData, setprivateData] = useState(<div></div>);
  //用于接受audio的组件
  let currentData;
  //用于接受video的src属性的数据
  let VideoSrc;
  //用于接受img的src属性的数据
  let ImageSrc;
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
  const onFinishImg = (values) => {
    for (let item of data) {
      if (item.id === rightPanelElementId) {
        for (let key in values) {
          item[key] = values[key];
        }
        item.src = ImageSrc;
      }
    }

    dispatch({ type: "SETDATA", data: data });
  };
  const onFinishPanel = (values) => {
    for (let key in values) {
      data[0][key] = values[key];
    }

    dispatch({ type: "SETDATA", data: data });
  };
  //上传图片预览的onchange方法
  const onchange_img = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file);
      ImageSrc = URL.createObjectURL(file);
    }
  };
  //上传音频的onchange方法
  const onchange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      VideoSrc = window.URL.createObjectURL(file);
    }
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
  const onFinishVideo = (values) => {
    console.log("test");
    for (let item of data) {
      if (item.id === rightPanelElementId) {
        for (let key in values) {
          item[key] = values[key];
        }

        item.src = VideoSrc;
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
  const generateFormItem = (obj) => {
    return Object.keys(obj).map((key) => {
      if (key === "id" || key === "type") {
        return null;
      }
      return (
        <Form.Item key={key} label={key} name={key}>
          <Input />
        </Form.Item>
      );
    });
  };
  const generateRightPanel = async () => {
    if (rightPanelType === RIGHT_PANEL_TYPE.NONE) {
      setprivateData(<div>未选中元素</div>);
      return;
    } else if (rightPanelType === RIGHT_PANEL_TYPE.PANEL) {
      const elementData = data[0];
      const { height, width, backgroundColor } = elementData;
      setprivateData(
        <div>
          <h2 style={{ padding: 10 }}>画布属性</h2>
          <Form
            key="panel"
            name="basic"
            style={{ padding: 10 }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              height: height,
              width: width,
              backgroundColor: backgroundColor,
            }}
            onFinish={onFinishPanel}
            autoComplete="off"
          >
            <Form.Item label="height" name="height">
              <Input />
            </Form.Item>

            <Form.Item
              label="width"
              name="width"
              rules={[{ message: "请输入文本颜色" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="backgroundColor" name="backgroundColor">
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      );
    } else if (rightPanelType === RIGHT_PANEL_TYPE.TEXT) {
      const elementData = findCurrentElement(rightPanelElementId);

      setprivateData(
        <div>
          <h2 style={{ padding: 10 }}>文字组件</h2>
          <Form
            key={rightPanelElementId}
            name="basic"
            style={{ margin: 30 }}
            labelCol={{ span: 10 }}
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
              label="颜色"
              name="color"
              rules={[{ message: "请输入文本颜色" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="大小"
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
          <h2 style={{ padding: 10 }}>图片组件</h2>
          <Form
            key={rightPanelElementId}
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
            onFinish={onFinishImg}
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
          <input accept="image/*" type="file" onChange={onchange_img}></input>
        </div>
      );
    } else if (rightPanelType === "audio") {
      const elementData = findCurrentElement(rightPanelElementId);

      setprivateData(
        <div>
          <h2 style={{ padding: 10 }}>音频组件</h2>
          <Form
            key={rightPanelElementId}
            name="basic"
            style={{ margin: 30 }}
            labelCol={{ span: 8 }}
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

            <Form.Item label="top" name="top">
              <Input />
            </Form.Item>
            <Form.Item label="left" name="left">
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

          <h3 style={{ marginLeft: 30 }}>录音</h3>
          <Space style={{ marginLeft: 100 }}>
            <Button
              type="primary"
              onClick={async () => {
                const stream = await navigator.mediaDevices.getUserMedia({
                  audio: true,
                  video: false,
                });

                record = new MediaRecorder(stream, {
                  mimeType: "video/webm;codecs=h264",
                });

                record.ondataavailable = (e) => {
                  currentData = URL.createObjectURL(new Blob([e.data]));
                };
                record.start();
                message.info("开始录音");
              }}
            >
              开始录音
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (record === "") return;
                record.stop();
                message.info("录音中止");
              }}
            >
              中止录音
            </Button>
          </Space>
        </div>
      );
    } else if (rightPanelType === "video") {
      const elementData = findCurrentElement(rightPanelElementId);
      const { height, width, src, left, top } = elementData;
      setprivateData(
        <div>
          <h2 style={{ padding: 10 }}>视频组件</h2>
          <Form
            key={rightPanelElementId}
            name="basic"
            style={{ margin: 30 }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              width: width,
              height: height,
              left: left,
              top: top,
              src: src,
            }}
            onFinish={onFinishVideo}
            autoComplete="off"
          >
            <Form.Item label="高度" name="height">
              <Input />
            </Form.Item>

            <Form.Item label="宽度" name="width">
              <Input />
            </Form.Item>

            <Form.Item label="top" name="top">
              <Input />
            </Form.Item>
            <Form.Item label="left" name="left">
              <Input />
            </Form.Item>
            <Form.Item label="src" name="src">
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
          <input accept="video/*" type="file" onChange={onchange}></input>
        </div>
      );
    } else if (rightPanelType === "card") {
      const elementData = findCurrentElement(rightPanelElementId);
      const {
        name,
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
      } = elementData;
      setprivateData(
        <div>
          <h2 style={{ padding: 10 }}>Card组件</h2>
          <Form
            key={rightPanelElementId}
            name="basic"
            layout="inline"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            initialValues={{
              width_img: width_img,
              height_img: height_img,
              src: src,
              width: width,
              height: height,
              left: left,
              top: top,
              name: name,
              soujia: soujia,
              guapai: guapai,
              fangxing: fangxing,
              zhuangxiu: zhuangxiu,
              mianji: mianji,
              louxing: louxing,
              chaoxiang: chaoxiang,
              niandai: niandai,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            {generateFormItem(elementData)}
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
    }
  };
  useEffect(() => {
    generateRightPanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, rightPanelType, rightPanelElementId]);

  return <div className="right">{privateData}</div>;
}

export default Right;
