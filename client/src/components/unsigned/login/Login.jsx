import React, { useState } from "react";
import LoginForm from "./LoginForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Styles from "./login.module.css";
import Loader from "react-loader-spinner";
import Backdrop from "@material-ui/core/Backdrop";
import "@fontsource/roboto";

export default function Login({ setToken }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Container className={Styles.loginContainer} component="main" maxWidth="xs">
      <Backdrop id={Styles.loader} open={open}>
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </Backdrop>

      <CssBaseline />
      <div className={Styles.wraper}>
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <LoginForm
          setToken={setToken}
          setMessage={setMessage}
          setOpen={setOpen}
        />
        <p style={{ color: "red" }}> {message} </p>
      </div>
    </Container>
  );
}
