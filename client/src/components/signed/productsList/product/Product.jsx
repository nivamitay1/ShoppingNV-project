import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { domain } from "../../../../config";
import Styles from "./product.module.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ChooseQuantity from "./ChooseQuantity";
export default function Product({ product }) {
  const [quantity, setQuantity] = useState(0);

  let dispatch = useDispatch();
  const cart_id = useSelector((state) => state.cartReducer.id);
  const addItemToCart = async () => {
    dispatch({ type: "OPEN_LOADER" });
    if (quantity === 0) {
      alert("Please select the product quantity");
      return dispatch({ type: "CLOSE_LOADER" });
    }
    const cartItem = {
      total_price: (
        Math.round(Number(product.price) * quantity * 100) / 100
      ).toFixed(2),
      quantity,
      product_id: product.id,
      cart_id,
    };
    const res = await axios.post(`${domain}/carts/cart-item`, cartItem);
    if ((res.data.status = "success")) {
      res.data.cartItem.product = product;
      dispatch({ type: "ADD_ITEM_TO_CART", newCartItem: res.data.cartItem });
    }

    dispatch({ type: "CLOSE_LOADER" });
  };

  return (
    <Card className={Styles.productCard}>
      <CardMedia
        component="img"
        height="140"
        image={product.product_img}
        title={product.product_name}
        className={Styles.productImg}
      />
      <div>
        <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
      </div>
      <CardContent>
        <Typography
          variant="body2"
          color="textPrimary"
          component="p"
          className={Styles.productName}
        >
          {product.product_name}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="div">
          Price: {product.price}$
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" onClick={addItemToCart}>
          Add to Cart <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
