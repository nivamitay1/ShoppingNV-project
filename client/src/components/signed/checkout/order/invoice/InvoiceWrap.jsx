import React from "react";
import Invoice from "./Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

export default function InvoiceWrap() {
  const cart = useSelector((state) => state.cartReducer);
  const order = useSelector((state) => state.orderReducer);
  const receiptData = {
    company: `${order.firstName} ${order.lastName}`,
    email: order.email,
    address: `${order.city}, ${order.street}`,
    trans_date: new Date().toDateString(),
    due_date: order.deliveryDate.toDateString(),
    items: cart.cart_items,
    totalPrice: cart.cartTotalPrice,
  };

  return (
    <>
      <PDFDownloadLink
        document={<Invoice receiptData={receiptData} />}
        fileName="Invoice.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : " Here "
        }
      </PDFDownloadLink>
    </>
  );
}
