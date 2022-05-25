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
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F121006%2F219049-12100616021661.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655814591&t=521347d9a7ae2769eeab04667ae906c3"
          />
        }
      >
        <h2 className="card_title">房源信息</h2>
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
