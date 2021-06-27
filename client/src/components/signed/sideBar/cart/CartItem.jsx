import React from "react";
import DeleteBtn from "./DeleteBtn";
import Quantity from "./Quantity";
import Styles from "./cart.module.css";
import { ListItem, Divider } from "@material-ui/core";

export default function CartItems({ cartItem }) {
  return (
    <>
      <ListItem className={Styles.itemWrap}>
        <DeleteBtn cartItem={cartItem} />
        <Quantity cartItem={cartItem} />
        <div className={Styles.itemImageWrap}>
          <img
            src={cartItem.product.product_img}
            className={Styles.itemImage}
          />
        </div>
        <div className={Styles.itemDescriptionWrap}>
          <div className={Styles.itemDescription}>
            {cartItem.product.product_name}
          </div>
        </div>

        <div className={Styles.itemTotal_priceWrap}>
          <span className={Styles.itemTotal_price}>
            {cartItem.total_price} $
          </span>
        </div>
      </ListItem>
      <Divider />
    </>
  );
}
