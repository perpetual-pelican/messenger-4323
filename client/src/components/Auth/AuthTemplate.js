import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import signupPicture from "./signupPicture.png";
import bubbleIcon from "./bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  },
  sideBanner: {
    backgroundImage: (
      `linear-gradient(${theme.palette.primary.main}CC, #86B9FFCC),
      url(${signupPicture})`
    ),
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: theme.palette.secondary.light,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  bannerContent: {
    margin: "0 10% 25% 10%",
  },
  text: {
    fontSize: 22,
    marginTop: "10%"
  }
}));

const AuthTemplate = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid container xs={5} className={classes.sideBanner}>
        <Box className={classes.bannerContent}>
          <img src={bubbleIcon} alt=""/>
          <Typography className={classes.text}>
            Converse with anyone with any language
          </Typography>
        </Box>
      </Grid>
      <Grid container xs={7} justify="center">
        {props.children}
      </Grid>
    </Grid>
  );
};

export default AuthTemplate;
