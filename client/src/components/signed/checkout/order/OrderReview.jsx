import React, { useState } from "react";
import SuccessfulPurchaseDialog from "./SuccessfulPurchaseDialog";
import axios from "axios";
import { domain } from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./order.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function OrderReview({ activeStep, setActiveStep }) {
  let dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const classes = useStyles();
  const cart = useSelector((state) => state.cartReducer);
  const order = useSelector((state) => state.orderReducer);

  const makeOrder = async () => {
    dispatch({ type: "OPEN_LOADER" });
    const newOrder = {
      total_price: cart.cartTotalPrice,
      delivery_city: order.city,
      delivery_street: order.street,
      delivery_date: order.deliveryDate,
      ordered_at: new Date(),
      credit_card: order.creditCardNumber,
      user_id: JSON.parse(localStorage.getItem("ShoppingNVUser")).id,
      cart_id: cart.id,
    };
    const res = await axios.post(`${domain}/orders`, newOrder);
    if (res.data.status === "success") {
      setOpenDialog(true);
    }
  };

  return (
    <React.Fragment>
      <SuccessfulPurchaseDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />

      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List className={Styles.ItemList}>
        {cart.cart_items.map((cart_item) => (
          <ListItem className={classes.listItem} key={cart_item.id}>
            <ListItemText
              primary={cart_item.product.product_name}
              secondary={`Quantity:${cart_item.quantity}`}
            />
            <Typography variant="body2">{cart_item.total_price} $</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary={"Shipping"} />
          <Typography variant="body2">{"Free"}</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {cart.cartTotalPrice.toFixed(2)} $
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography
            gutterBottom
          >{`${order.firstName} ${order.lastName}`}</Typography>
          <Typography
            gutterBottom
          >{`${order.city}, ${order.street}`}</Typography>
          <Typography gutterBottom>
            {order.deliveryDate.toDateString()}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom>Card number</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{order.creditCardNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Expiry date</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  gutterBottom
                >{`${order.expirationDate.getMonth()}/${order.expirationDate.getFullYear()}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Cvv</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{order.cvv}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
        <div className={Styles.btns}>
          <Button
            variant="contained"
            type="button"
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
          >
            Cancel
          </Button>
          <Button
            id={Styles.nextBtn}
            variant="contained"
            color="primary"
            onClick={makeOrder}
          >
            Order
          </Button>
        </div>
      </Grid>
    </React.Fragment>
  );
}
