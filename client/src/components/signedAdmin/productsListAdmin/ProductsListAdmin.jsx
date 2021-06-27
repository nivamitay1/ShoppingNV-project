import React, { useState, useEffect } from "react";
import ProductAdmin from "./productAdmin/ProductAdmin";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { domain } from "../../../config";
import { Grid } from "@material-ui/core";
import Styles from "./productsListAdmin.module.css";
import LoaderComp from "../../loader/LoaderComp";

export default function ProductsListAdmin({ render }) {
  let dispatch = useDispatch();

  const products = useSelector((state) => state.productsListReducer);
  const currentCategory = useSelector((state) => state.categoryReducer);
  console.log(products);
  const [openLoader, setOpenLoader] = useState(false);
  useEffect(() => {
    let didCancel = false;

    async function getAllProducts() {
      dispatch({ type: "OPEN_LOADER" });

      console.log("All" + " " + currentCategory);
      const res = await axios.get(`${domain}/products`);

      if (!didCancel) {
        dispatch({
          type: "SET_PRODUCTS_ֹֹLIST",
          productsList: res.data.products,
        });
      }
      dispatch({ type: "CLOSE_LOADER" });
    }
    async function getCategoryProducts() {
      console.log("Category" + " " + currentCategory);
      dispatch({ type: "OPEN_LOADER" });

      const res = await axios.get(`${domain}/products/${currentCategory}`);

      if (!didCancel) {
        dispatch({
          type: "SET_PRODUCTS_ֹֹLIST",
          productsList: res.data.products,
        });
        dispatch({ type: "CLOSE_LOADER" });
      }
    }
    if (currentCategory) {
      getCategoryProducts();
    } else {
      getAllProducts();
    }

    return () => {
      didCancel = true;
    };
  }, [render]);
  return (
    <>
      <LoaderComp openLoader={openLoader} />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={Styles.productsWrap}
      >
        {products.map((product) => {
          return (
            <Grid
              item
              xl={2}
              lg={3}
              md={4}
              key={product.id}
              className={Styles.productGrid}
            >
              <ProductAdmin product={product} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
