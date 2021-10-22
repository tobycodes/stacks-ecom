import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import AllProducts from "./AllProducts";
import Category from "./Category";
import Product from "./Product";
import Layout from "../components/layout";

const AppRoute = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/product/:id" exact component={Product} />
        <Route path="/category/:name" exact component={Category} />
        <Route path="/all-products" exact component={AllProducts} />
        <Route path="/" component={Home} />
      </Switch>
    </Layout>
  );
};

export default AppRoute;
