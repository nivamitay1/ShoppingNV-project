import React from "react";
import { useDispatch } from "react-redux";
import Styles from "./productAdmin.module.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";

export default function ProductAdmin({ product }) {
  let dispatch = useDispatch();
  const handleDrawerOpenEditProduct = () => {
    // open edit product sidebar
    dispatch({ type: "OPEN_EDIT_PRODUCT", product });
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleDrawerOpenEditProduct}
        >
          Edit <EditIcon fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
}
