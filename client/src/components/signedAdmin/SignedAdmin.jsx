import React, { useState } from "react";
import SideBarAdmin from "./sideBarAdmin/SideBarAdmin";
import CategoriesAdmin from "./categoriesAdmin/CategoriesAdmin";
import ProductsListAdmin from "./productsListAdmin/ProductsListAdmin";

export default function SignedAdmin({ setToken }) {
  const [render, setRender] = useState(0);
  return (
    <div>
      <SideBarAdmin setToken={setToken} />
      <CategoriesAdmin setRender={setRender} />
      <ProductsListAdmin render={render} />
    </div>
  );
}
