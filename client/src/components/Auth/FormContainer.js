import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "70%",
    marginBottom: "10%"
  },
  message: {
    fontSize: 26,
    fontWeight: 600
  },
  submitButton: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 16,
    fontWeight: 500,
    boxShadow: "none",
    padding: theme.spacing(2, 7),
    borderRadius: theme.spacing(0.4),
    margin: theme.spacing(4, 0)
  }
}));

const FormContainer = (props) => {
  const classes = useStyles();
  const { onSubmit, message, buttonLabel, children } = props;

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <Typography className={classes.message}>
        {message}
      </Typography>
      {children}
      <Grid container justifyContent="center">
        <Button className={classes.submitButton}
          type="submit"
          variant="contained"
          color="primary"
          size="large">
          {buttonLabel}
        </Button>
      </Grid>
    </form>
  );
};

export default FormContainer;
