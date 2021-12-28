import Layout from "./components/Layout";
import { BrowserRouter, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
