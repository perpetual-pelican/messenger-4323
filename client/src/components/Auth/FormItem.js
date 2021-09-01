import React from "react";
import { Grid, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%"
  }
}));

const FormItem = (props) => {
  const classes = useStyles();

  return (
    <Grid>
      <FormControl className={classes.formControl}
        error={props.error}
        margin="normal"
        required>
        {props.children}
      </FormControl>
    </Grid>
  );
};

export default FormItem;
