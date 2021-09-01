import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import AuthTemplate from "./components/Auth/AuthTemplate";
import SwitchPageContainer from "./components/Auth/SwitchPageContainer";
import FormContainer from "./components/Auth/FormContainer";
import FormItem from "./components/Auth/FormItem";

const Login = (props) => {
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
        <FormItem>
          <TextField
            aria-label="username"
            label="E-mail address"
            name="username"
            type="text"/>
        </FormItem>
        <FormItem>
          <TextField
            label="Password"
            ariaLabel="password"
            type="password"
            name="password"/>
        </FormItem>
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
