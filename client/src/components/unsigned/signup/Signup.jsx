import React, { useState } from "react";
import AddressForm from "./AddressForm";
import UserInfoForm from "./UserInfoForm";
import Styles from "./signup.module.css";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

const steps = ["Account details", "Shipping address"];

export default function Signup({ setToken }) {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <UserInfoForm
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setOpen={setOpen}
          />
        );
      case 1:
        return (
          <AddressForm
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setToken={setToken}
          />
        );

      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <Button
        type="button"
        variant="text"
        onClick={handleOpen}
        color="primary"
        size="large"
      >
        Don't have an account? Sign up
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={Styles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <main className={Styles.main}>
            <Paper className={Styles.wraper}>
              <Typography component="h1" variant="h4" align="center">
                Sign up
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
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
