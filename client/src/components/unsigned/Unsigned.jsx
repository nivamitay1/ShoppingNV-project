import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./about/About";
import Login from "./login/Login";
import Styles from "./unsigned.module.css";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export default function Unsigned({ setToken }) {
  return (
    <Grid container>
      <AppBar position="relative" color="transparent" className={Styles.appBar}>
        <Toolbar>
          <div className={Styles.logoDiv}>
            <img
              className={Styles.logoImg}
              src="https://res.cloudinary.com/dzwabkqxt/image/upload/v1624368076/ShoppingNV/instagram_profile_image_j74lto.jpg"
            />
          </div>
        </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          <Route path="/">
            <Grid item xs={12} className={Styles.loginPanel}>
              <Login setToken={setToken} />
            </Grid>
          </Route>
        </Switch>
      </Router>
      <Grid item xs={12}>
        <About />
      </Grid>
    </Grid>
  );
}
