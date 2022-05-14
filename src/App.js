import "./App.scss";
import BaseRouter from "./router";
import ContextProvider from "./redux/context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  return (
    <ContextProvider>
      <DndProvider backend={HTML5Backend}>
        <BaseRouter />
      </DndProvider>
    </ContextProvider>
  );
}

export default App;
