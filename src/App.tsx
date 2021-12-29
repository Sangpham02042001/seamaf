import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/Category";
import ProductPage from "./pages/Product";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Home />}>
        </Route>
        <Route path="/category/:categoryId" component={() => <CategoryPage />}>
        </Route>
        <Route path="/product/:productId" component={() => <ProductPage />}>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
