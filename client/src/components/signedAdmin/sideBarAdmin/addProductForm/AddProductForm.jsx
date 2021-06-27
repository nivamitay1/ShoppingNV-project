import React, { useState } from "react";
import axios from "axios";
import { domain } from "../../../../config";
import Styles from "../sideBarAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Button, TextField } from "@material-ui/core";
import CategoriesSelect from "./CategoriesSelect";
import LoaderComp from "../../../loader/LoaderComp";

export default function AddProductForm() {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.categoryReducer);
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState("");

  const handleDrawerClose = () => {
    dispatch({ type: "CLOSE" });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
    }
    setSelectedFile(file);
    setProductImage(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    dispatch({ type: "OPEN_LOADER" });
    if (
      !selectedFile ||
      !productDescription ||
      !productPrice ||
      !productCategory
    ) {
      dispatch({ type: "CLOSE_LOADER" });
      return alert("All fields are mandatory");
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadProduct(reader.result);
    };
  };

  const uploadProduct = async (base64EncodedImage) => {
    try {
      const product = {
        product_name: productDescription,
        price: productPrice,
        product_img: base64EncodedImage,
        category_id: productCategory,
      };
      const res = await axios.post(`${domain}/products`, product);
      dispatch({
        type: "ADMIN_ADD_PRODUCT",
        newProduct: res.data.product,
        currentCategory,
      });
      dispatch({ type: "CLOSE_LOADER" });

      handleDrawerClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoaderComp />
      <form>
        <List>
          <ListItem>
            <h2 style={{ margin: "auto" }}>Add Product</h2>
          </ListItem>
          <ListItem>
            <TextField
              multiline
              fullWidth
              label="Product description"
              rowsMax={6}
              onChange={(e) => {
                setProductDescription(e.target.value);
              }}
            />
          </ListItem>

          <ListItem>
            <TextField
              fullWidth
              type="number"
              step="any"
              label="Product price"
              value={productPrice}
              onChange={(e) => {
                setProductPrice(e.target.value);
              }}
            />
          </ListItem>
          <ListItem>
            <CategoriesSelect
              productCategory={productCategory}
              setProductCategory={setProductCategory}
            />
          </ListItem>
          <ListItem>
            <label htmlFor="contained-button-file">
              <TextField
                accept="image/*"
                multiple
                type="file"
                fullWidth
                style={{ display: "none" }}
                id="contained-button-file"
                onChange={handleFileInputChange}
              />
              <Button
                variant="contained"
                component="span"
                fullWidth
                size="small"
                className={Styles.imageBtn}
              >
                Choose Product Image
              </Button>
            </label>
          </ListItem>

          <ListItem>
            {previewSource && (
              <img src={previewSource} className={Styles.previewImage} />
            )}
          </ListItem>
        </List>
        <ListItem>
          <Button
            type="submit"
            onClick={handleSubmitFile}
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </ListItem>
      </form>
    </>
  );
}
