import Board from "./board";
import Context from "../../redux/store";
import { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function Index() {
  const { state } = useContext(Context);

  return (
    <DndProvider backend={HTML5Backend}>
      <Board knightPosition={state.position} />;
    </DndProvider>
  );
}

export default Index;
