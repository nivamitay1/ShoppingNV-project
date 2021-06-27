import React from "react";
import Styles from "./signup.module.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { domain } from "../../../config";
import { useDispatch, useSelector } from "react-redux";

export default function AddressForm({ activeStep, setActiveStep, setToken }) {
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.userReducer);

  const createAccount = async (values) => {
    dispatch({ type: "SECOND_STEP", user: values });
    newUser.city = values.city;
    newUser.street = values.street;

    const res = await axios.post(`${domain}/users`, newUser);
    if (res.data.status === "success") {
      localStorage.setItem(
        "ShoppingNVUser",
        JSON.stringify({
          id: res.data.newUser.id,
          email: res.data.newUser.email,
          first_name: res.data.newUser.first_name,
          last_name: res.data.newUser.last_name,
          city: res.data.newUser.city,
          street: res.data.newUser.street,
          role: res.data.newUser.role,
        })
      );
      return setToken("ok");
    }
  };

  const validationSchema = yup.object({
    city: yup
      .string("Enter your city name")
      .matches(/[a-zA-Z]+/gi, "Name can only contain letters")
      .min(2, " Please enter your city name")
      .required("City name is required"),
    street: yup
      .string("Enter your street name")
      .matches(/[a-zA-Z]+/gi, " Name can only contain letters")
      .min(2, " Please enter your street name")
      .required("Street name is required"),
  });

  const formik = useFormik({
    initialValues: {
      city: "",
      street: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      createAccount(values);
    },
  });

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping city"
              onChange={formik.handleChange}
              value={formik.values.city}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="street"
              name="street"
              label="Street"
              fullWidth
              autoComplete="shipping street-line"
              onChange={formik.handleChange}
              value={formik.values.street}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className={Styles.btns}>
          <Button
            variant="contained"
            onClick={() => {
              setActiveStep(activeStep - 1);
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            id={Styles.createBtn}
          >
            Create Accuont
          </Button>
        </Grid>
      </form>
    </React.Fragment>
  );
}
