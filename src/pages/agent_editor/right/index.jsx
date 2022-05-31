import Context from "../../../redux/store";
import { useContext, useEffect, useState } from "react";
import { RIGHT_PANEL_TYPE } from "../../../redux/constants";
import "./index.scss";
import { Input, Form, Button, Space, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { changeLabel } from "../../../utils/constant/index";
import { Scrollbars } from "react-custom-scrollbars";
function Right() {
  const { state, dispatch } = useContext(Context);
  const { data, rightPanelType, rightPanelElementId } = state;
  const [audioForm] = Form.useForm();
  const [imgForm] = Form.useForm();
  const [videoForm] = Form.useForm();
  const [cardForm] = Form.useForm();
  const [privateData, setprivateData] = useState(<div></div>);
  function createProps(action, name, form) {
    return {
      name: name,
      action: action,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }

        if (info.file.status === "done") {
          for (let item of data) {
            if (item.id === rightPanelElementId) {
              item.src = info.fileList[0].response.src;
              form.setFieldsValue(item);
            }
          }

          dispatch({ type: "SETDATA", data: data });
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  }

  //用于接受audio的组件
  let currentData;
  //用于接受video的src属性的数据
  let VideoSrc;
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
      if (key === "id" || key === "type" || key === "toid") {
        return null;
      }
      return (
        <Form.Item key={key} label={changeLabel[key]} name={key}>
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
        <div style={{ overflowY: "scroll" }}>
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
        <div style={{ overflowY: "scroll" }}>
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
      imgForm.setFieldsValue(elementData);
      setprivateData(
        <div style={{ overflowY: "scroll" }}>
          <h2 style={{ padding: 10 }}>图片组件</h2>
          <Form
            form={imgForm}
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
          <Upload {...createProps("/upload/picture", "picture", imgForm)}>
            <Button style={{ marginLeft: "50%" }} icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
        </div>
      );
    } else if (rightPanelType === "audio") {
      const elementData = findCurrentElement(rightPanelElementId);

      setprivateData(
        <div style={{ overflowY: "scroll" }}>
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

          <Upload {...createProps("/upload/audio", "audio", audioForm)}>
            <Button style={{ marginLeft: "50%" }} icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
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
          <Upload {...createProps("/upload/video", "video", videoForm)}>
            <Button style={{ marginLeft: "50%" }} icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
          <p>mp4格式的视频需要使用编码格式为AVC(H264),否则可能会出现异常</p>
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
        <div style={{ overflowY: "scroll", height: "100vh" }}>
          <h2 style={{ padding: 10 }}>Card组件</h2>
          <Form
            form={cardForm}
            key={rightPanelElementId}
            style={{ marginLeft: 20 }}
            name="basic"
            labelAlign="right"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
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
          <Upload {...createProps("/upload/picture", "picture", cardForm)}>
            <Button style={{ marginLeft: "50%" }} icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
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
