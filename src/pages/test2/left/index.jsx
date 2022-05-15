import "./index.scss";
import TextComponent from "../../../components/textComponent";
import ImageComponent from "../../../components/imageComponent";
import AudioComponent from "../../../components/audioComponent";
function Left() {
  return (
    <div className="test2_left">
      <div>
        <TextComponent />
        <ImageComponent />
        <AudioComponent />
      </div>
    </div>
  );
}

export default Left;
