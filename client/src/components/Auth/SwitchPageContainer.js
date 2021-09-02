import React from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "20%"
  },
  container: {
    marginTop: theme.spacing(2),
    alignItems: "center",
    justifyContent: "flex-end"
  },
  caption: {
    fontSize: 14,
    color: theme.palette.secondary.main
  },
  button: {
    padding: "2% 5%",
    marginLeft: theme.spacing(2),
    boxShadow: "0px 1px 16px lightGrey",
    fontSize: 14,
    color: theme.palette.primary.main
  }
}));

const SwitchPageContainer = (props) => {
  const classes = useStyles();

  const { caption, buttonLabel, onClick } = props;

  return (
    <Container className={classes.root}>
      <Grid container className={classes.container}>
        <Typography className={classes.caption}>
          {caption}
        </Typography>
        <Button className={classes.button}
          onClick={onClick}>
          {buttonLabel}
        </Button>
      </Grid>
    </Container>
  );
};

export default SwitchPageContainer;
