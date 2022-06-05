import { Card, Layout, message } from "antd";
import { Form, Input, Button } from "antd";
import { React, useState } from "react";
import "./index.scss";
import { reqGetInfo, reqInfoUpdata } from "../../utils/ajax_uitis";

function Info() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (value) => {
    setLoading((loading) => {
      const newLoading = !loading;
      return newLoading;
    });
    let getRes = await reqGetInfo();

    if (getRes["ret"]) {
      getRes = getRes["profileInfo"];
      const name =
        value["username"] != null ? value["username"] : getRes["name"];
      const data = {
        realname: value["realName"],
        phoneNumber: value["phoneNumber"],
        Password: value["password"],
        name,
      };

      const postRes = await reqInfoUpdata(data);
      if (!postRes) {
        setLoading((prevLoading) => {
          const newLoading = !prevLoading;
          return newLoading;
        });
        if (postRes["ret"]) {
          message.success(postRes["message"]);
          // 添加本地存储
          localStorage.setItem("username", value["username"]);
        } else {
          message.error("修改失败，请重新检查填写的信息！");
        }
      }
    }
  };

  return (
    <Layout className="info-layout">
      {/* <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header> */}
      <Card className="user-info" title="个人信息">
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 3 }}
          form={form}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="info-form"
        >
          <Form.Item label="用户名" name="username" className="form-item">
            <Input maxLength={30} showCount />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            className="form-item"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password visibilityToggle="true" />
          </Form.Item>
          <Form.Item
            label="真实姓名"
            name="realName"
            className="form-item"
            rules={[
              {
                required: true,
                message: "请输入你的真实姓名",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phoneNumber"
            className="form-item"
            rules={[
              {
                required: true,
                message: "请输入你的手机号",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 1 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              确认
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}

export default Info;
