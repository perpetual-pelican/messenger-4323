import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    width: "75%"
  },
  message: {
    fontSize: 22,
    fontWeight: 600
  },
  loginButton: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 11,
    boxShadow: "none",
    padding: theme.spacing(1, 4),
    borderRadius: theme.spacing(0.2),
    margin: theme.spacing(3, 0)
  }
}));

const FormContainer = (props) => {
  const classes = useStyles();
  const { onSubmit, message, buttonLabel, children } = props;

  return (
    <Grid className={classes.root}>
      <form onSubmit={onSubmit}>
        <Grid>
          <Typography className={classes.message}>
            {message}
          </Typography>
        </Grid>
        {children}
        <Grid container justify="center">
          <Button className={classes.loginButton}
            type="submit"
            variant="contained"
            color="primary"
            size="large">
            {buttonLabel}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default FormContainer;
