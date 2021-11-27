import { Component } from "react";
import {Link} from 'react-router-dom';
import './index.css';


class Login extends Component {
  state = { email: "", password: "", showSubmitError: false, errorMsg: "" };

  onSubmitSuccess = () => {
    const { history } = this.props;
    history.replace("/");
  };

  validateData = async () => {
    const { email, password } = this.state;
    let data = await localStorage.getItem("myData");
    data = JSON.parse(data);

    if (data === null) {
      this.setState({
        showSubmitError: true,
        errorMsg: "No user exists, please register",
      });
    } else if (email !== data.email) {
      this.setState({
        showSubmitError: true,
        errorMsg: "Please enter your registered email address",
      });
    } else if (password !== data.password) {
      this.setState({
        showSubmitError: true,
        errorMsg: "An incorrect password has been entered",
      });
    } else {
      this.setState({ showSubmitError: false, errorMsg: "" });
    }
  };

  onClickLogin = async (event) => {
    const { email, password } = this.state;
    event.preventDefault();

    if (email === "" || password === "") {
      let errMsg = "Enter valid details";
      this.setState({ showSubmitError: true, errorMsg: errMsg });
    } else {
      await this.validateData();

      const { showSubmitError } = this.state;

      if (!showSubmitError) {
        const loginStage = { isLoggedIn: true };
        localStorage.setItem("loginState", JSON.stringify(loginStage));
        this.onSubmitSuccess();
      }
    }
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { email, password, showSubmitError, errorMsg } = this.state;

    return (
      <>
        <div className="main-container">
          <div className="login-container">
            <form onSubmit={this.onClickLogin} autoComplete="off">
              <h3 className="form-title">Login</h3>
                <div className="input-container">
                <label htmlFor="input-id" className="label" >Email</label>
                  <input
                    type="text"
                    className="input-form"
                    id="input-id"
                    placeholder="Email"
                    value={email}
                    onChange={this.onChangeEmail}
                  />
              </div>
                <div className="input-container">
                <label htmlFor="password-id" className="label">Password</label>
                  <input
                    type="password"
                    className="input-form"
                    id="password-id"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />

                <button type="submit" className="login-button">
                Login
              </button>
              </div>

              <p className="signup-line">Don't have an account?<Link to="/signup"><span className="signup-text">Signup</span></Link></p>
              <br />
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
