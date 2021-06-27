import React, { useState } from "react";
import axios from "axios";
import { domain } from "../../../../config";
import { useDispatch } from "react-redux";
import Styles from "./cart.module.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export default function Quantity({ cartItem }) {
  let dispatch = useDispatch();
  const [quantity, setQuantity] = useState(cartItem.quantity || 0);

  const increaseQuantity = async () => {
    const newTotalPrice = (
      (Number(cartItem.product.price) * (quantity + 1) * 100) /
      100
    ).toFixed(2);
    const data = {
      id: cartItem.id,
      newQuantity: quantity + 1,
      newTotalPrice: newTotalPrice,
    };
    setQuantity(Number(quantity) + 1);
    const res = await axios.patch(`${domain}/carts/cart-item`, data);
    dispatch({ type: "UPDATE_ITEM_QUANTITY", cartItem: data });
  };

  const decreaseQuantity = async () => {
    const newTotalPrice = (
      (Number(cartItem.product.price) * (quantity - 1) * 100) /
      100
    ).toFixed(2);
    const data = {
      id: cartItem.id,
      newQuantity: quantity - 1,
      newTotalPrice: newTotalPrice,
    };
    setQuantity(quantity - 1);
    const res = await axios.patch(`${domain}/carts/cart-item`, data);
    dispatch({ type: "UPDATE_ITEM_QUANTITY", cartItem: data });
  };

  const inputChangeHandler = async (e) => {
    const newTotalPrice = (
      (Number(cartItem.product.price) * e.target.value * 100) /
      100
    ).toFixed(2);

    const data = {
      id: cartItem.id,
      newQuantity: Number(e.target.value),
      newTotalPrice: newTotalPrice,
    };
    setQuantity(Number(e.target.value));
    const res = await axios.patch(`${domain}/carts/cart-item`, data);
    dispatch({ type: "UPDATE_ITEM_QUANTITY", cartItem: data });
  };

  return (
    <div className={Styles.itemQuantity}>
      <div className={Styles.counterWrap}>
        <button className={Styles.counterBtn} onClick={increaseQuantity}>
          <AddIcon />
        </button>
        <span className={Styles.quantityInputWrap}>
          <input
            type="number"
            value={quantity}
            id={Styles.quantityInput}
            onChange={inputChangeHandler}
          />
        </span>
        <button className={Styles.counterBtn} onClick={decreaseQuantity}>
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
}
