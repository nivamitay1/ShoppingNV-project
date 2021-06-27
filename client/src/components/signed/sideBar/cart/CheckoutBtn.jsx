import React from "react";
import { useHistory } from "react-router-dom";
import Styles from "./cart.module.css";
import { Button } from "@material-ui/core";

export default function CheckoutBtn({ cartTotalPrice }) {
  let history = useHistory();

  return (
    <>
      {cartTotalPrice ? (
        <div className={Styles.checkoutBtnWrap}>
          <Button
            id={Styles.checkoutBtn}
            onClick={() => {
              history.push("/checkout");
            }}
          >
            Checkout {cartTotalPrice.toFixed(2)}$
          </Button>
        </div>
      ) : null}
    </>
  );
}
