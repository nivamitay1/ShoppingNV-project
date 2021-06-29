import React, { useState } from "react";
import Signup from "../signup/Signup";
import CartDialog from "./CartDialog";
import styles from "./login.module.css";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { domain } from "../../../config";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm({ setToken, message, setMessage, setOpen }) {
  let history = useHistory();
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const [user, setUser] = useState({});
  const [cartCrationDate, setCartCrationDate] = useState({});
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const checkUser = async (values) => {
    setOpen(true);
    const res = await axios.post(`${domain}/users/login`, values);
    setMessage(res.data.message);

    if (res.data.status === "success") {
      if (res.data.user.email === "AdminAdmin@gmail.com") {
        // checking if admin
        res.data.user.admin = true;

        localStorage.setItem("ShoppingNVUser", JSON.stringify(res.data.user));
        setToken("admin");
        setOpen(false);
        return history.push("/");
      }
      setOpen(false);
      if (res.data.user.carts.length === 0) {
        localStorage.setItem(
          "ShoppingNVUser",
          JSON.stringify({
            id: res.data.user.id,
            email: res.data.user.email,
            first_name: res.data.user.first_name,
            last_name: res.data.user.last_name,
            city: res.data.user.city,
            street: res.data.user.street,
            role: res.data.user.role,
          })
        );
        return setToken("ok");
      } else {
        setUser(res.data.user);
        setCartCrationDate(
          new Date(res.data.user.carts[0].created_at).toLocaleString()
        );
        setCartTotalPrice(res.data.cartTotalPrice);
        setOpenCartDialog(true);
      }
    } else {
      setMessage(res.data.message);
      toast.error(res.data.message);
      setOpen(false);
    }
  };
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      checkUser(values);
    },
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
      <CartDialog
        openCartDialog={openCartDialog}
        setOpenCartDialog={setOpenCartDialog}
        setToken={setToken}
        user={user}
        cart={user.carts}
        cartCrationDate={cartCrationDate}
        cartTotalPrice={cartTotalPrice}
      />
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}></Grid>

          <Grid item xs={12}>
            <TextField
              variant="filled"
              required
              className={styles.input}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              required
              fullWidth
              className={styles.input}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" id={styles.submit}>
          Login
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Signup setToken={setToken} />
          </Grid>
        </Grid>
      </form>
    </>
  );
}
