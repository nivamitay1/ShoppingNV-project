import React, { useState } from "react";
import DeliveryDatePicker from "./DeliveryDatePicker";
import Styles from "./order.module.css";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import valid from "card-validator";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function OrderFrom({ activeStep, setActiveStep }) {
  const dispatch = useDispatch();
  let history = useHistory();
  const [selectedDate, handleDateChange] = useState(new Date());

  const checkAccountDetails = async (values) => {
    values.deliveryDate = selectedDate;
    console.log(values, selectedDate);
    dispatch({ type: "SET_ORDER", order: values });
    setActiveStep(activeStep + 1);
  };

  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your first name")
      .matches(/[a-zA-Z]+/gi, "Name can only contain letters")
      .min(2, " Please enter your first name")
      .required("First name is required"),
    lastName: yup
      .string("Enter your last name")
      .matches(/[a-zA-Z]+/gi, " Name can only contain letters")
      .min(2, " Please enter your last name")
      .required("Last name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    city: yup
      .string("Enter your city")
      .min(2, "City should be of minimum 2 characters length")
      .required("City is required"),
    street: yup
      .string("Enter your address")
      .required("Address is required")
      .min(2, "Address should be of minimum 2 characters length")
      .matches(/^[a-zA-Z0-9\s,'-]*$/, "Is not in correct format"),
    creditCardNumber: yup
      .number()
      .test(
        "test-number",
        "Credit Card number is invalid",
        (value) => valid.number(value).isValid
      )
      .required("Credit Card number is required"),
    expirationDate: yup
      .date()
      .test(
        "test-date",
        "Expiration date is invalid",
        (value) =>
          valid.expirationDate({
            month: value.getMonth(),
            year: value.getFullYear(),
          }).isValid
      )
      .required("Expiration date is required"),
    cvv: yup
      .string()
      .test(
        "test-cvv",
        "cvv number is invalid",
        (value) => valid.cvv(value).isValid
      )
      .required("cvv is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      street: "",
      creditCardNumber: "",
      expirationDate: new Date(),
      cvv: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      checkAccountDetails(values);
    },
  });

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        {/*Delivery information  */}

        <Typography variant="h6" gutterBottom>
          Delivery information
        </Typography>
        <Typography variant="caption" color="textPrimary" gutterBottom>
          * DoubleClick on the fields for Autocomplete
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              onDoubleClick={(e) => {
                formik.setFieldValue(
                  "firstName",
                  JSON.parse(localStorage.getItem("ShoppingNVUser")).first_name,
                  true
                );
              }}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              onDoubleClick={(e) => {
                formik.setFieldValue(
                  "lastName",
                  JSON.parse(localStorage.getItem("ShoppingNVUser")).last_name,
                  true
                );
              }}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="Email address"
              fullWidth
              onDoubleClick={(e) => {
                formik.setFieldValue(
                  "email",
                  JSON.parse(localStorage.getItem("ShoppingNVUser")).email,
                  true
                );
              }}
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label="City"
              fullWidth
              onDoubleClick={(e) => {
                formik.setFieldValue(
                  "city",
                  JSON.parse(localStorage.getItem("ShoppingNVUser")).city,
                  true
                );
              }}
              onChange={formik.handleChange}
              value={formik.values.city}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="street"
              name="street"
              label="Address"
              fullWidth
              onDoubleClick={(e) => {
                formik.setFieldValue(
                  "street",
                  JSON.parse(localStorage.getItem("ShoppingNVUser")).street,
                  true
                );
              }}
              onChange={formik.handleChange}
              value={formik.values.street}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
          </Grid>
          <Grid item xs={12}>
            <DeliveryDatePicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
          </Grid>

          {/*Payment information  */}

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Payment details
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="creditCardNumber"
              name="creditCardNumber"
              label="Credit Card Number"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.creditCardNumber}
              error={
                formik.touched.creditCardNumber &&
                Boolean(formik.errors.creditCardNumber)
              }
              helperText={
                formik.touched.creditCardNumber &&
                formik.errors.creditCardNumber
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                id="expirationDate"
                name="expirationDate"
                variant="inline"
                openTo="year"
                minDate={new Date()}
                views={["year", "month"]}
                label="Expiration Date"
                helperText={
                  formik.touched.expirationDate && formik.errors.expirationDate
                }
                error={
                  formik.touched.expirationDate &&
                  Boolean(formik.errors.expirationDate)
                }
                value={formik.values.expirationDate}
                onClick={() => {
                  console.log(
                    `${formik.values.expirationDate.getMonth()}/${formik.values.expirationDate.getFullYear()}`
                  );
                }}
                onChange={(val) => {
                  formik.setFieldValue("expirationDate", val);
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="cvv"
              name="cvv"
              label="Cvv"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.cvv}
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
            />
          </Grid>
        </Grid>
        <div className={Styles.btns}>
          <Button
            variant="contained"
            type="button"
            onClick={() => history.push("/checkout")}
          >
            Cancel
          </Button>
          <Button
            id={Styles.nextBtn}
            variant="contained"
            color="primary"
            type="submit"
          >
            Next
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}
