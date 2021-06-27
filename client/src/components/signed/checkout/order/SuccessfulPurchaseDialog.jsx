import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InvoiceWrap from "./invoice/InvoiceWrap";

export default function SuccessfulPurchaseDialog({
  openDialog,
  setOpenDialog,
}) {
  let history = useHistory();
  let dispatch = useDispatch();
  const handleClose = () => {
    setOpenDialog(false);
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "CLOSE_LOADER" });
    history.push("/");
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: "green" }} id="alert-dialog-title">
          {"Your purchase was successful !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click
            <InvoiceWrap />
            to download the receipt
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
