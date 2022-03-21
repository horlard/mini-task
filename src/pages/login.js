import React, { Component } from "react";
import InputForm from "../components/Form";
import styled from "styled-components";
import Api from "../api/api";

const Container = styled.div`
  background: #1c437e;
  height: 100vh;
`;

const Form = styled.form`
  position: absolute;
  width: 60%;
  top: 40%;
  left: 62%;
  transform: translate(-50%, -50%);
`;

const H2 = styled.h2`
  color: #fff;
  text-align: center;
  margin-left: -46%;
  font-size: 40px;
`;

const Button = styled.button`
  text-align: center;
  margin-left: 17%;
  margin-top: 7%;
  font-size: 23px;
  font-weight: 700;
  font-family: inherit;
  color: #1c437e;
  padding: 7px 60px;
`;

class login extends Component {
  state = {
    status: "",
    errCode: "",
    email: "",
    password: "",
    loginValues: {
      email: "",
      password: "",
    },
  };

  onEmailChange = (term) => {
    this.setState({ email: term });
  };
  onPasswordChange = (term) => {
    this.setState({ password: term });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState(
      (state) => ({
        loginValues: {
          email: state.email,
          password: state.password,
        },
      }),
      () => {
        Api.post("/staffLogin", this.state.loginValues)
          .then(() => {
            this.props.history.push("/welcome");
            return;
          })
          .catch((err) => {
            this.setState({ errCode: err.request.status });
          });
        this.setState({ status: "" });
      }
    );
  };

  errorHandler = () => {
    const { errCode } = this.state;
    if (errCode === 401) {
      return "Email or Password is incorrect";
    } else if (errCode === 400) {
      return "Email or Password is missing";
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <H2>Log in!</H2>
          <InputForm
            email={this.state.email}
            password={this.state.password}
            onEmailChange={this.onEmailChange}
            onPasswordChange={this.onPasswordChange}
            error={this.errorHandler}
            status={this.state.status}
          />
          <Button>Log in</Button>
        </Form>
      </Container>
    );
  }
}

export default login;
