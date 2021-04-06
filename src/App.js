import { BrowserRouter } from "react-router-dom";
import Content from "./layout/Content";
import Header from "./layout/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Header />
        <Content />
      </div>
    </BrowserRouter>
  );
}

export default App;
