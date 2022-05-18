import { React } from "react";
import { Card, Input, Table } from "antd";

import "./index.scss";
const { Search } = Input;

const columns = [
  {
    title: "项目名称",
    dataIndex: "name",
    key: "name",
    render: (text) => <div style={{ fontWeight: 600 }}>{text}</div>,
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "创建时间",
    dataIndex: "time",
    key: "time",
  },

  {
    title: "操作",
    key: "action",
    render: (text, record) => (
      <div className="action">
        <span className="action_e">发起语言邀请</span>
        <span className="action_b"> | </span>
        <span className="action_e">在线投屏演示</span>
      </div>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "我是用户我是用户我是用户",
  },
  {
    key: "2",
    name: "我是用户我是用户我是用户",
  },
  {
    key: "3",
    name: "我是用户我是用户我是用户",
  },
];
function ItemUsers() {
  return (
    <div className="itemLists">
      <Card
        className="itemLists_Card"
        title={<p>正在浏览xxx项目的用户</p>}
        extra={
          <Search
            placeholder="请输入"
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
          />
        }
      >
        <Table
          showHeader={false}
          className="itemLists_Card_table"
          columns={columns}
          dataSource={data}
        />
      </Card>
    </div>
  );
}

export default ItemUsers;
