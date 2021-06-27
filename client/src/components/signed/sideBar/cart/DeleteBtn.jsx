import React from "react";
import axios from "axios";
import { domain } from "../../../../config";
import { useDispatch } from "react-redux";
import Styles from "./cart.module.css";
import ClearIcon from "@material-ui/icons/Clear";

export default function DeleteBtn({ cartItem }) {
  let dispatch = useDispatch();
  const deleteCartItem = async () => {
    dispatch({ type: "OPEN_LOADER" });

    const res = await axios.delete(`${domain}/carts/cart-item`, {
      data: { id: cartItem.id },
    });
    if ((res.data.status = "success")) {
      dispatch({ type: "DELETE_ITEM_FROM_CART", cartItem: cartItem });
    }
    dispatch({ type: "CLOSE_LOADER" });
  };
  return (
    <button className={Styles.deleteBtn} onClick={deleteCartItem}>
      <ClearIcon />
    </button>
  );
}
