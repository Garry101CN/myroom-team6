import { Card, Layout, Menu } from 'antd';
import { Form, Input, Button } from 'antd';
import {React} from 'react';
import './index.scss'


const { Header } = Layout;
const items1 = ['项目列表', '个人信息'].map(key => ({
  key,
  label: `${key}`,
}));

const onFinish = () => {

}
const onFinishFailed = () => {

}

const onSubmit = () => {

}

function Info() {
  // const [formLayout, setFormLayout] = useState('horizontal');
  return(
    <Layout className='info-layout'>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
      <Card className='user-info' title="个人信息">
        <Form
          name="basic"
          layout="horizontal"
          labelCol={{ span: 3 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="info-form"
        >
          <Form.Item
            label="用户名"
            name="username"
            className='form-item'
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input maxLength={30} showCount />
          </Form.Item>
          <Form.Item
            label="密码"
            name ="password"
            className='form-item'
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password visibilityToggle="true" />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 1}}
          >
            <Button type="primary" htmlType="submit" onSubmit={onSubmit}>
              确认
            </Button>
          </Form.Item>
        </Form>  
      </Card>
  </Layout>
  );
}

export default Info;
