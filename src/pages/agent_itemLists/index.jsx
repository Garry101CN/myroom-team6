import { React } from "react";
import { Card, Input, Button, Table } from "antd";
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
        <span className="action_e">编辑</span>
        <span className="action_b"> | </span>
        <span className="action_e">删除</span>{" "}
        <span className="action_b">|</span>
        <span className="action_e">发布</span>{" "}
        <span className="action_b">|</span>
        <span className="action_e">查看在线用户</span>
      </div>
    ),
  },
];
const data = [
  {
    key: "1",
    name:
      "我是一个项目，我是一个项目，我是一个项目，我是一个项目，我是一个项目，",
    owner: "我是作者",
    time: "2020-12-12",
  },
  {
    key: "2",
    name:
      "我是一个项目，我是一个项目，我是一个项目，我是一个项目，我是一个项目",
    owner: "我是作者",
    time: "2020-12-12",
  },
  {
    key: "3",
    name:
      "我是一个项目，我是一个项目，我是一个项目，我是一个项目，我是一个项目，",
    owner: "我是作者",
    time: "2020-12-12",
  },
];
function ItemLists() {
  return (
    <div className="itemLists">
      <Card
        className="itemLists_Card"
        title="项目列表"
        extra={
          <Search
            placeholder="请输入"
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
          />
        }
      >
        <Button
          style={{ width: "100%", height: "50px", marginBottom: "20px" }}
          type="dashed"
        >
          Dashed
        </Button>
        <Table
          className="itemLists_Card_table"
          columns={columns}
          dataSource={data}
        />
      </Card>
    </div>
  );
}

export default ItemLists;
