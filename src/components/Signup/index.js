import { Component } from "react";
import {Link} from 'react-router-dom';
import "./index.css";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    showSubmitError: false,
    errorMsg: "",
  };

  validateForm = () => {
    const { email, password, confirmPassword } = this.state;

    if (email === "") {
      this.setState({
        showSubmitError: true,
        errorMsg: "Enter valid Email",
      });
    } else if (password !== confirmPassword) {
      this.setState({
        showSubmitError: true,
        errorMsg: "Passwords do not match",
      });
    } else {
      this.setState({ showSubmitError: false, errorMsg: "" });
    }
  };

  onClickSignUp = async (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    const data = { email: email, password: password };
    await this.validateForm();

    const { showSubmitError } = this.state;
    if (!showSubmitError) {
      await localStorage.setItem("myData", JSON.stringify(data));
      this.setState({
        email: "",
        password: "",
        confirmPassword: "",
        showSubmitError: true,
        errorMsg: "Registered successfully ",
      });
      const {history} = this.props
      history.replace('/login');
    }
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      showSubmitError,
      errorMsg,
    } = this.state;
    return (
      <>
        <div className="main-container">
          <div className="login-container">
            <form onSubmit={this.onClickSignUp} autoComplete="off">
              <h3 className="form-title">Signup</h3>
                <div className="input-container">
                <label htmlFor="input-id" className="label" >Email</label>
                  <input
                    type="text"
                    className="input-form"
                    id="input-id"
                    placeholder="Enter Your Email Id"
                    value={email}
                    onChange={this.onChangeEmail}
                  />
              </div>
              <div className="input-container">
                <label htmlFor="password-id" className="label" >Password</label>
                  <input
                    type="password"
                    className="input-form"
                    id="password-id"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
              </div>
                <div className="input-container">
                <label htmlFor="password-confirm-id" className="label">Password</label>
                  <input
                    type="password"
                    className="input-form"
                    id="password-confirm-id"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={this.onChangeConfirmPassword}
                  />

                <button type="submit" className="login-button">
                Signup
              </button>
              </div>

              <p className="signup-line">Already have an account?<Link to="/login"><span className="signup-text">Login</span></Link></p>
              
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
