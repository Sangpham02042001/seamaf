import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/Category";
import ProductPage from "./pages/Product";
import CartPage from "./pages/Cart";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import AdminRoute from "./pages/Admin";
import Users from "./pages/Admin/Users";
import "antd/dist/antd.css";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={() => <Home />}>
          </Route>
          <Route path="/cart" component={() => <CartPage />}>
          </Route>
          <Route path={'/login'} component={() => <LoginPage />}>
          </Route>
          <Route path='/signup' component={() => <SignupPage />}>
          </Route>
          <Route path="/category/:categoryId" component={() => <CategoryPage />}>
          </Route>
          <Route path="/product/:productId" component={() => <ProductPage />}>
          </Route>
          <AdminRoute path='/admin'>
            <Switch>
              <Route path={'/admin/users'}>
                <Users />
              </Route>
            </Switch>
          </AdminRoute>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
