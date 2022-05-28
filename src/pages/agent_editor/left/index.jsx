import "./index.scss";
import { Button, Divider, message, Modal, Input } from "antd";
import TextComponent from "../../../components/textComponent";
import ImageComponent from "../../../components/imageComponent";
import AudioComponent from "../../../components/audioComponent";
import CardComponent from "../../../components/cardComponent";
import VideoComponent from "../../../components/videoComponent";
import { useContext, useRef, useState } from "react";
import Context from "../../../redux/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { reqUpdate } from "../../../utils/ajax_uitis/index";
function Left({ projectId }) {
  const nav = useNavigate();
  const { state, dispatch } = useContext(Context);
  const { data } = state;
  console.log(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const ref = useRef(null);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const request = {};
    request.author = localStorage.getItem("username");
    request.name = ref.current.input.value;
    request.data = data;
    if (!projectId) {
      const res = await axios({
        method: "post",
        url: "/agent/create/project",
        data: JSON.stringify(request),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ret) {
        message.success("您已成功创建该项目");
        dispatch({ type: "reset" });
        nav("/");
      } else {
        dispatch({ type: "reset" });
        message.error("您还没有登录，或者登录过期，请重新登录");
        nav("/login");
      }
      setIsModalVisible(false);
    } else {
      const res = await reqUpdate(projectId, request);
      if (res.ret) {
        setIsModalVisible(false);
        dispatch({ type: "reset" });
        message.success("您已成功更新该项目");
        nav("/");
      } else {
        dispatch({ type: "reset" });
        message.error("您还没有登录，或者登录过期，请重新登录");
        nav("/login");
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="test2_left">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>组件</h2>
        <Button type="primary" onClick={showModal}>
          {projectId ? "更新项目" : "创建项目"}
        </Button>
        <Modal
          title="活动页名称"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input ref={ref}></Input>
        </Modal>
      </div>
      <Divider />
      <div className="test2_component">
        <TextComponent />
        <ImageComponent />
        <AudioComponent />
        <VideoComponent />
        <CardComponent />
      </div>
    </div>
  );
}

export default Left;
