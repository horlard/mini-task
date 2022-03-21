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

export default class signup extends Component {
  state = {
    errCode: "",
    status: "",
    email: "",
    password: "",
    name: "",
    mobile: "",
    SignupValues: {
      email: "",
      password: "",
      name: "",
      mobile: "",
    },
  };

  onEmailChange = (term) => {
    this.setState({ email: term });
  };
  onPasswordChange = (term) => {
    this.setState({ password: term });
  };
  onNameChange = (term) => {
    this.setState({ name: term });
  };
  onMobileChange = (term) => {
    this.setState({ mobile: term });
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.setState(
      (state) => ({
        SignupValues: {
          email: state.email,
          password: state.password,
          name: state.name,
          mobile: state.mobile,
        },
      }),
      () => {
        Api.post("/staffRegister", this.state.SignupValues)
          .then((res) => {
            this.setState({ status: "Successfull" }, () => {
              this.props.history.push("/");
            });
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
    if (errCode === 402) {
      return "User already exists";
    } else if (errCode === 400) {
      return "Email or Password is missing";
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Form onSubmit={this.onSubmit}>
            <H2>Sign up</H2>
            <InputForm
              signup="true"
              onNameChange={this.onNameChange}
              onMobileChange={this.onMobileChange}
              onPasswordChange={this.onPasswordChange}
              onEmailChange={this.onEmailChange}
              name={this.state.name}
              mobile={this.state.mobile}
              password={this.state.password}
              email={this.state.email}
              error={this.errorHandler}
              status={this.state.status}
            />
            <Button>Sign up</Button>
          </Form>
        </Container>
      </div>
    );
  }
}
