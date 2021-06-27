import React from "react";
import Styles from "../checkout.module.css";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useSelector } from "react-redux";

export default function CartReviewRow({ cartItem }) {
  const searchValue = useSelector((state) => state.cartReviewReducer);

  return (
    <TableRow className={Styles.tableRow}>
      <TableCell className={Styles.tableCell}>
        <div className={Styles.productCellWrap}>
          <div className={Styles.itemImageWrap}>
            <img
              src={cartItem.product.product_img}
              className={Styles.itemImage}
            />
          </div>

          <div className={Styles.itemDescriptionWrap}>
            <span className={Styles.itemDescription}>
              {searchValue &&
              cartItem.product.product_name
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) > -1 ? (
                <mark>{cartItem.product.product_name}</mark>
              ) : (
                <>{cartItem.product.product_name}</>
              )}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className={Styles.tableCell}>{cartItem.quantity}</TableCell>
      <TableCell className={Styles.tableCell}>
        {cartItem.product.price}$
      </TableCell>
      <TableCell className={Styles.tableCell}>
        {cartItem.total_price}$
      </TableCell>
    </TableRow>
  );
}
