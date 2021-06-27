import React, { useState } from "react";
import axios from "axios";
import { domain } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./sideBar.module.css";
import RemoveShoppingCartTwoToneIcon from "@material-ui/icons/RemoveShoppingCartTwoTone";
import { Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

export default function ClearCartBtn() {
  let dispatch = useDispatch();
  const cart_id = useSelector((state) => state.cartReducer.id);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const clearCart = async () => {
    dispatch({ type: "OPEN_LOADER" });

    const res = await axios.delete(`${domain}/carts`, {
      data: { cart_id },
    });
    if ((res.data.status = "success")) {
      dispatch({ type: "CLEAR_CART" });
    }
    handleClose();
    dispatch({ type: "CLOSE_LOADER" });
  };
  return (
    <>
      <div className={Styles.clearCartBtnWrap}>
        <Button
          variant="contained"
          className={Styles.clearCartBtn}
          onClick={() => {
            setOpen(true);
          }}
        >
          Clear The Cart <RemoveShoppingCartTwoToneIcon />
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to proceed with deleting all the items from
            the cart
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={clearCart} color="secondary">
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
