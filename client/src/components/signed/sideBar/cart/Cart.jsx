import React, { useEffect } from "react";
import CartItem from "./CartItem";
import CheckoutBtn from "./CheckoutBtn";
import axios from "axios";
import { domain } from "../../../../config";
import Styles from "./cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
export default function Cart() {
  const user_id = JSON.parse(localStorage.getItem("ShoppingNVUser")).id;
  let dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cart_items);
  const cartTotalPrice = useSelector(
    (state) => state.cartReducer.cartTotalPrice
  );

  useEffect(() => {
    let didCancel = false;
    const getOrCreateCart = async () => {
      const res = await axios.get(`${domain}/carts/${user_id}`);
      if (!didCancel) {
        console.log(res.data.cart);
        dispatch({
          type: "SET_CART",
          cart: res.data.cart,
        });
        console.log("blahh");
      }
    };
    getOrCreateCart();
    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <>
      <List className={Styles.cartList}>
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />;
        })}
      </List>
      <CheckoutBtn cartTotalPrice={cartTotalPrice} />
    </>
  );
}
