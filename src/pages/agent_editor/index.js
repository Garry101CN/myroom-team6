import Left from "./left";
import Center from "./center";
import Right from "./right";
import "./index.scss";

function Test2() {
  // const {state,dispatch}=useContext(Context)
  
  return (
    <div className="test2">
      <Left />
      <Center />
      <Right />
    </div>
  );
}

export default Test2;
