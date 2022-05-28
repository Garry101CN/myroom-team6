import { React, useEffect, useState, useContext } from "react";
import { Card, Input, Button, Table, message } from "antd";
import dayjs from "dayjs";
import "./index.scss";
import { reqGetProject, reqEditor, reqGetDetail } from "../../utils/ajax_uitis";
import Context from "../../redux/store";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

function ItemLists() {
  const { state, dispatch } = useContext(Context);
  const [data, setData] = useState([]);
  const nav = useNavigate();
  const projectDelete = async (text) => {
    const res = await reqEditor(text.id);
    if (res.ret) {
      message.success("删除成功");
      const newres = await reqGetProject();
      setData(newres.data.reverse());
    }
  };
  const projectEditor = async (text) => {
    const res = await reqGetDetail(text.id);
    console.log(res);
    dispatch({ type: "SETDATA", data: res.data });
    nav("/editor", { state: text.id });
  };
  const columns = [
    {
      title: "项目名称",
      dataIndex: "name",
      key: "id",
      render: (text) => <div style={{ fontWeight: 600 }}>{text}</div>,
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "autor",
    },
    {
      title: "创建时间",
      dataIndex: "createAt",
      key: "createAt",
      render: (text) => <div>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</div>,
    },

    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <div className="action">
          <span onClick={() => projectEditor(text)} className="action_e">
            编辑
          </span>
          <span className="action_b"> | </span>
          <span onClick={() => projectDelete(text)} className="action_e">
            删除
          </span>
          <span className="action_b">|</span>
          <span className="action_e">查看在线用户</span>
        </div>
      ),
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const asyncfunc = async () => {
      const res = await reqGetProject();
      setData(res.data.reverse());
    };
    asyncfunc();

    return;
  }, []);
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
          rowKey="id"
          className="itemLists_Card_table"
          columns={columns}
          dataSource={data}
        />
      </Card>
    </div>
  );
}

export default ItemLists;
