import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Styles from "./checkout.module.css";

export default function OrderBtn() {
  let history = useHistory();
  const cartItems = useSelector((state) => state.cartReducer.cart_items);
  const cartTotalPrice = useSelector(
    (state) => state.cartReducer.cartTotalPrice
  );
  return (
    <div className={Styles.orderBtnBanner}>
      <div className={Styles.totalSummary}>
        <span className={Styles.estTotal}>
          <span className={Styles.estTotalTitle}>Estimated Total:</span>
          <span className={Styles.total}>
            <span className={Styles.itemsTotal}>
              ({cartItems.length} items)
            </span>
            <span className={Styles.priceTotal}> {cartTotalPrice} $</span>
          </span>
        </span>
        <span className={Styles.proceedBtnWrap}>
          <button
            className={Styles.proceedBtn}
            onClick={() => {
              history.push("/order");
            }}
          >
            Proceed To Checkout
            <br />
            <span className={Styles.proceedBtnPriceTotal}>
              ({cartItems.length} items) {cartTotalPrice} $
            </span>
          </button>
        </span>
      </div>
    </div>
  );
}
