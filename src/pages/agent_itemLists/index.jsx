import { React, useEffect, useState, useContext, useRef } from "react";
import { Card, Input, Table, message } from "antd";
import dayjs from "dayjs";
import "./index.scss";
import { reqGetProject, reqEditor, reqGetDetail } from "../../utils/ajax_uitis";
import Context from "../../redux/store";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

function ItemLists() {
  const { dispatch } = useContext(Context);
  let resetData = useRef(null);
  const [data, setData] = useState([]);
  const nav = useNavigate();
  const projectDelete = async (text) => {
    const res = await reqEditor(text.id);
    console.log(res);
    if (res.ret) {
      message.success("删除成功");
      const newres = await reqGetProject();
      setData(newres.data.reverse());
    }
  };
  const searchItem = (value) => {
    value = value.trim();
    if (value === "") {
      setData(resetData.current);
      return;
    }
    let newData = data.filter((item) => {
      for (let key in item) {
        if (item[key] == null) return false;
        if (key !== "id") {
          if (item[key].indexOf(value) !== -1) {
            return true;
          }
        }
      }
      return false;
    });

    setData(newData);
  };
  const projectEditor = async (text) => {
    const res = await reqGetDetail(text.id);
    let Id;
    for (let item of res.data) {
      if (item.type === "card") {
        Id = item.Id;
      }
    }
    dispatch({ type: "SETDATA", data: res.data });
    nav("/editor", { state: { projectId: text.id, Id: Id } });
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
          <span
            onClick={() => {
              if (localStorage.getItem("username") !== text.author) {
                message.error("您没有权限修改该活动页");
                return;
              }
              projectEditor(text);
            }}
            className="action_e"
          >
            编辑
          </span>
          <span className="action_b"> | </span>
          <span
            onClick={() => {
              if (localStorage.getItem("username") !== text.author) {
                message.error("您没有权限修改该活动页");
                return;
              }
              projectDelete(text);
            }}
            className="action_e"
          >
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

      if (res === 401) {
        message.error("您还未登录或者登录已过期");
        nav("/login", { replace: true });
      }

      setData(res.data.reverse());
      resetData.current = JSON.parse(JSON.stringify(res.data));
    };
    asyncfunc();
  }, [nav]);
  return (
    <div className="itemLists">
      <Card
        className="itemLists_Card"
        title="已制作的活动页"
        extra={
          <Search
            placeholder="请输入"
            onSearch={(value) => searchItem(value)}
            style={{ width: 300 }}
          />
        }
      >
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
