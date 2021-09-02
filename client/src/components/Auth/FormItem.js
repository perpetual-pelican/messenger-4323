import React from "react";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  }
}));

const FormItem = (props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root}
      error={props.error}
      margin="normal"
      required>
      {props.children}
    </FormControl>
  );
};

export default FormItem;
