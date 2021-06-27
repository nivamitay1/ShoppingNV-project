import React from "react";
import axios from "axios";
import { domain } from "../../../config";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function CartDialog({
  openCartDialog,
  setOpenCartDialog,
  setToken,
  user,
  cart,
  cartCrationDate,
  cartTotalPrice,
}) {
  const handleClose = () => {
    setOpenCartDialog(false);
  };
  const keep = () => {
    localStorage.setItem(
      "ShoppingNVUser",
      JSON.stringify({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        city: user.city,
        street: user.street,
        role: "Client",
      })
    );

    handleClose();
    setToken("ok");
  };
  const clear = async () => {
    const res = await axios.delete(`${domain}carts`, {
      data: {
        cart_id: cart[0].id,
      },
    });
    localStorage.setItem(
      "ShoppingNVUser",
      JSON.stringify({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        city: user.city,
        street: user.street,
        role: "Client",
      })
    );
    handleClose();
    setToken("ok");
  };
  return (
    <div>
      <Dialog
        open={openCartDialog}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>Welcome back {user.first_name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have an open cart from {cartCrationDate},<br />
            with the total price of {cartTotalPrice}$. Would you like to clear
            the cart or keep it ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={clear}
            color="secondary"
          >
            Clear
          </Button>
          <Button variant="contained" onClick={keep} color="primary">
            Keep
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
