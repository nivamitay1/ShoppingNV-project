import React from "react";
import { useSelector } from "react-redux";
import Styles from "./loader.module.css";
import Loader from "react-loader-spinner";
import Backdrop from "@material-ui/core/Backdrop";
export default function LoaderComp() {
  const openLoader = useSelector((state) => state.loaderReducer);
  return (
    <div>
      <Backdrop id={Styles.loader} open={openLoader}>
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </Backdrop>
    </div>
  );
}
