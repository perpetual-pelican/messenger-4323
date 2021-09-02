import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Box, TextField } from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import AuthTemplate from "./components/Auth/AuthTemplate";
import SwitchPageContainer from "./components/Auth/SwitchPageContainer";
import FormContainer from "./components/Auth/FormContainer";
import FormItem from "./components/Auth/FormItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  itemBox: {
    margin: theme.spacing(3, 0, 3, 0)
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthTemplate>
      <SwitchPageContainer
        caption="Don't have an account?"
        buttonLabel="Create account"
        onClick={() => history.push("/register")}/>
      <FormContainer
        message="Welcome back!"
        buttonLabel="Login"
        onSubmit={handleLogin}>
        <Box className={classes.itemBox}>
          <FormItem>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"/>
          </FormItem>
        </Box>
        <Box className={classes.itemBox}>
          <FormItem>
            <TextField
              label="Password"
              aria-label="password"
              type="password"
              name="password"/>
          </FormItem>
        </Box>
      </FormContainer>
    </AuthTemplate>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
