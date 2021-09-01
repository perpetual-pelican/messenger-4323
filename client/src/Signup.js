import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, FormHelperText } from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import AuthTemplate from "./components/Auth/AuthTemplate";
import SwitchPageContainer from "./components/Auth/SwitchPageContainer";
import FormContainer from "./components/Auth/FormContainer";
import FormItem from "./components/Auth/FormItem";

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthTemplate>
      <SwitchPageContainer
        caption="Already have an account?"
        buttonLabel="Login"
        onClick={() => history.push("/login")}/>
      <FormContainer
        message="Create an account."
        buttonLabel="Create"
        onSubmit={handleRegister}>
        <FormItem>
          <TextField
            aria-label="username"
            label="Username"
            name="username"
            type="text"
            required
          />
        </FormItem>
        <FormItem>
          <TextField
            label="E-mail address"
            aria-label="e-mail address"
            type="email"
            name="email"
            required
          />
        </FormItem>
        <FormItem error={!!formErrorMessage.confirmPassword}>
          <TextField
            aria-label="password"
            label="Password"
            type="password"
            inputProps={{ minLength: 6 }}
            name="password"
            required
          />
          <FormHelperText>
            {formErrorMessage.confirmPassword}
          </FormHelperText>
        </FormItem>
        <FormItem error={!!formErrorMessage.confirmPassword}>
          <TextField
            label="Confirm Password"
            aria-label="confirm password"
            type="password"
            inputProps={{ minLength: 6 }}
            name="confirmPassword"
            required
          />
          <FormHelperText>
            {formErrorMessage.confirmPassword}
          </FormHelperText>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
