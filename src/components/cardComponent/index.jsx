import { Card } from "antd";
import { useDrag } from "react-dnd";
import { COMPONENT_TYPE } from "../../redux/constants";
import "./index.scss";

function CardComponent() {
  const [, drag] = useDrag(() => ({
    type: "component",
    item: {
      tag: COMPONENT_TYPE.CARD,
    },
  }));
  return (
    <div ref={drag} className="cardComponent">
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={
          <img
            style={{ height: "200px" }}
            className="card_img"
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <h2 className="card_title">我是房源名称</h2>
        <div className="cardLists">
          <div>售价:xxx</div>
          <div>挂牌:xxx</div>
          <div>房型:xxx</div>
          <div>装修:xxx</div>
          <div>面积:xxx</div>
          <div>楼型:xxx</div>
          <div>朝向:xxx</div>
          <div>年代:xxx</div>
        </div>
      </Card>
    </div>
  );
}

export default CardComponent;
