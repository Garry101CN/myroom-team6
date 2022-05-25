import "./index.scss";
import TextComponent from "../../../components/textComponent";
import ImageComponent from "../../../components/imageComponent";
import AudioComponent from "../../../components/audioComponent";
import CardComponent from "../../../components/cardComponent";
import VideoComponent from "../../../components/videoComponent";
function Left() {
  return (
    <div className="test2_left">
      <h2>组件</h2>
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
