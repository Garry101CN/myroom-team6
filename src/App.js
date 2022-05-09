import "./App.scss";
import BaseRouter from "./router";
import ContextProvider from "./redux/context";

function App() {
  return (
    <ContextProvider>
      <BaseRouter />
    </ContextProvider>
  );
}

export default App;
