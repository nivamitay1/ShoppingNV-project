import React from "react";
import { useSelector } from "react-redux";
import Styles from "../checkout.module.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CartReviewRow from "./CartReviewRow";

export default function CartReviewTable() {
  const cartItems = useSelector((state) => state.cartReducer.cart_items);

  return (
    <div className={Styles.cartReviewTableWrap}>
      <h2 className={Styles.headline}>Your shopping cart</h2>
      <TableContainer component={Paper}>
        <Table id={Styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={Styles.headTableCell}>Product</TableCell>
              <TableCell className={Styles.headTableCell}>Quantity</TableCell>
              <TableCell className={Styles.headTableCell}>Unit price</TableCell>
              <TableCell className={Styles.headTableCell}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((cartItem) => (
              <CartReviewRow key={cartItem.id} cartItem={cartItem} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
