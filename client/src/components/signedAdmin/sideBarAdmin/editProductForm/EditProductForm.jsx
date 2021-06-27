import React, { useState } from "react";
import CategoriesSelectEdit from "./CategoriesSelectEdit";
import Styles from "../sideBarAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { domain } from "../../../../config";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Button, TextField } from "@material-ui/core";

export default function EditProductForm() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.sideBarReducer.product);
  const [productDescription, setProductDescription] = useState(
    product.product_name
  );
  const [productPrice, setProductPrice] = useState(product.price);
  const [productImage, setProductImage] = useState(product.product_img);
  const [productCategory, setProductCategory] = useState(product.category_id);
  const [selectedFile, setSelectedFile] = useState(product.product_img);
  const [previewSource, setPreviewSource] = useState(product.product_img);

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

    if (typeof selectedFile === "object") {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        uploadProduct(reader.result);
      };
    } else {
      uploadProduct(selectedFile);
    }
  };

  const uploadProduct = async (base64EncodedImage) => {
    try {
      const updatedProduct = {
        id: product.id,
        product_name: productDescription,
        price: productPrice,
        product_img: base64EncodedImage,
        category_id: productCategory,
      };
      const res = await axios.patch(`${domain}/products`, updatedProduct);
      dispatch({
        type: "ADMIN_UPDATE_PRODUCT",
        product_id: product.id,
        updatedProduct: res.data.product,
      });
      dispatch({ type: "CLOSE_LOADER" });

      handleDrawerClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <List>
        <ListItem>
          <TextField
            multiline
            fullWidth
            label="Product description"
            rowsMax={6}
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          />
        </ListItem>

        <ListItem>
          <TextField
            fullWidth
            label="Product price"
            value={productPrice}
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
          />
        </ListItem>
        <ListItem>
          <CategoriesSelectEdit
            productCategory={productCategory}
            setProductCategory={setProductCategory}
          />
        </ListItem>
        <ListItem>
          <label htmlFor="button-file">
            <TextField
              accept="image/*"
              multiple
              type="file"
              fullWidth
              style={{ display: "none" }}
              id="button-file"
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
        <ListItem>
          <Button
            type="submit"
            onClick={handleSubmitFile}
            variant="contained"
            color="primary"
            fullWidth
          >
            Save
          </Button>
        </ListItem>
      </List>
    </form>
  );
}
