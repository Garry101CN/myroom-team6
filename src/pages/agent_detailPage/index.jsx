import { Card, Table, Space, Tag, Input } from "antd";
import { useEffect, useState } from "react";
import { reqGetLists } from "../../utils/ajax_uitis/index";
import "./index.scss";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

function DetailLists() {
  const nav = useNavigate();
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "listing_name",
      dataIndex: "listing_name",
      key: "listing_name",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div
          onClick={() => nav("/editor", { state: record })}
          style={{ color: "#18aeff", cursor: "pointer" }}
        >
          制作活动页
        </div>
      ),
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getAllLists() {
      const res = await reqGetLists();
      setData(res.data);
    }
    getAllLists();
  }, []);

  return (
    <div>
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
        <Table columns={columns} dataSource={data} />;
      </Card>
    </div>
  );
}

export default DetailLists;
