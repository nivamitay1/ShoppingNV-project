import React, { useState, useEffect } from "react";
import axios from "axios";
import { domain } from "../../../../config";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function CategoriesSelect({
  productCategory,
  setProductCategory,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      let didCancel = false;
      const res = await axios.get(`${domain}/products/categories`);
      if (!didCancel) {
        setCategories(res.data.categories);
      }
    }
    getCategories();
  }, []);
  return (
    <>
      <Select
        value={productCategory}
        displayEmpty
        fullWidth
        onChange={(e) => {
          setProductCategory(e.target.value);
        }}
      >
        <MenuItem disabled value="">
          <em>Choose Category</em>
        </MenuItem>
        {categories.map((category) => {
          return (
            <MenuItem key={category.id} value={category.id}>
              {category.category_name}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
