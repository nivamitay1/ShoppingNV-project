import React, { useState, useEffect } from "react";
import SideBar from "./sideBar/SideBar";
import Categories from "./categories/Categories";
import ProductsList from "./productsList/ProductsList";
import Checkout from "./checkout/Checkout";
import Order from "./checkout/order/Order";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "../ProtectedRoute";

export default function Signed({ setToken }) {
  const [render, setRender] = useState(0);
  const cartItems = useSelector((state) => state.cartReducer.cart_items);

  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute
            exact
            path="/checkout"
            cartItems={cartItems}
            component={Checkout}
          />

          <ProtectedRoute
            exact
            path="/order"
            cartItems={cartItems}
            component={Order}
          />

          <Route path="/">
            <div>
              <SideBar setToken={setToken} />
              <Categories setRender={setRender} />
              <ProductsList render={render} />
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}
