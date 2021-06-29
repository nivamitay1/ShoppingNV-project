import React, { useState, useEffect } from "react";
import LoaderComp from "../../loader/LoaderComp";
import Product from "./product/Product";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { domain } from "../../../config";
import clsx from "clsx";
import Styles from "./productsList.module.css";
import { Grid } from "@material-ui/core";

export default function ProductsList({ render }) {
  let dispatch = useDispatch();

  const products = useSelector((state) => state.productsListReducer);
  const currentCategory = useSelector((state) => state.categoryReducer);
  const isSideBar = useSelector((state) => state.sideBarReducer.isOpen);

  useEffect(() => {
    let didCancel = false;

    async function getAllProducts() {
      dispatch({ type: "OPEN_LOADER" });

      const res = await axios.get(`${domain}/products`);

      dispatch({
        type: "SET_PRODUCTS_ֹֹLIST",
        productsList: res.data.products,
      });
      dispatch({ type: "CLOSE_LOADER" });
    }
    async function getCategoryProducts() {
      dispatch({ type: "OPEN_LOADER" });
      // get products of current category
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
      <LoaderComp />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={clsx(Styles.productsWrap, {
          [Styles.productsWrapOpenSideBar]: isSideBar,
        })}
      >
        {products.map((product) => {
          return (
            <Grid
              item
              xl={2}
              lg={3}
              md={4}
              sm={6}
              key={product.id}
              className={Styles.productGrid}
            >
              <Product product={product} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
