import React from "react";
import { useHistory } from "react-router";
import Styles from "../checkout.module.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import SearchInCart from "./SearchInCart";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    width: "100vw",
    backgroundColor: "white",
    boxShadow: "none",
    borderBottom: "1px solid #e5e5e5",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export default function CheckoutHeader() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <div className={classes.grow}>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <div>
            <IconButton variant="outlined" onClick={() => history.push("/")}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </div>
          <div className={Styles.logoDiv}>
            <img
              className={Styles.logoImg}
              src="https://res.cloudinary.com/dzwabkqxt/image/upload/v1624368076/ShoppingNV/instagram_profile_image_j74lto.jpg"
            />
          </div>
          <SearchInCart />
        </Toolbar>
      </AppBar>
    </div>
  );
}
