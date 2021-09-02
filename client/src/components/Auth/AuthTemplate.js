import React from "react";
import { Grid, Box, Typography, Hidden } from "@material-ui/core";
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
    margin: "0 10% 20% 10%",
  },
  icon: {
    height: theme.spacing(8),
    width: theme.spacing(8)
  },
  text: {
    fontSize: 26,
    fontWeight: 400,
    marginTop: "10%"
  }
}));

const AuthTemplate = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Hidden xsDown >
        <Grid container item sm={5} className={classes.sideBanner}>
          <Box className={classes.bannerContent}>
            <img src={bubbleIcon} alt="chat bubble icon" className={classes.icon}/>
            <Typography className={classes.text}>
              Converse with anyone with any language
            </Typography>
          </Box>
        </Grid>
      </Hidden>
      <Grid container item sm={7} justifyContent="center">
        {props.children}
      </Grid>
    </Grid>
  );
};

export default AuthTemplate;
