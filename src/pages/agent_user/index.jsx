import { React, useEffect, useState } from "react";
import { Card, Input, message, Table } from "antd";
import { reqonlineUser } from "../../utils/ajax_uitis";
import "./index.scss";

const { Search } = Input;

function ItemUsers() {
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div style={{ fontWeight: 600 }}>{text}</div>,
    },
    {
      title: "realname",
      dataIndex: "realname",
      key: "realname",
    },
    {
      title: "sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
  const [data, setData] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getUser = async () => {
      const res = await reqonlineUser();
      if (res === 401) {
        message.error("您还未登录或者登录过期，请重新登录");
      }

      setData(res);
    };
    getUser();
  }, []);
  return (
    <div className="itemLists">
      <Card
        className="itemLists_Card"
        title={<p>正在浏览xxx项目的用户</p>}
        extra={<Search placeholder="请输入" style={{ width: 300 }} />}
      >
        <Table
          className="itemLists_Card_table"
          columns={columns}
          dataSource={data}
        />
      </Card>
    </div>
  );
}

export default ItemUsers;
