import React from "react";
import CheckoutHeader from "./checkoutHeader/CheckoutHeader";
import CartReviewTable from "./reviewTable/CartReviewTable";
import OrderBtn from "./OrderBtn";

export default function Checkout() {
  return (
    <div>
      <CheckoutHeader />
      <CartReviewTable />
      <OrderBtn />
    </div>
  );
}
