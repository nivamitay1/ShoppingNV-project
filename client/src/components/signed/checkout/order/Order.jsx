import React, { useState } from "react";
import OrderForm from "./OrderFrom";
import OrderReview from "./OrderReview";
import Styles from "./order.module.css";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

const steps = ["Order details", "Review your order"];

export default function Order() {
  const [activeStep, setActiveStep] = useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <OrderForm activeStep={activeStep} setActiveStep={setActiveStep} />
        );
      case 1:
        return (
          <OrderReview activeStep={activeStep} setActiveStep={setActiveStep} />
        );

      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <div className={Styles.orderWrap}>
      <main className={Styles.main}>
        <Paper className={Styles.wraper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </div>
  );
}
