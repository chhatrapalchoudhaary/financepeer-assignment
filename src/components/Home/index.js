import { Component } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import DataDisplay from "../DataDisplay";
import "./index.css";

class Home extends Component {

  state = { isLoggedIn: true, 
    jsonData: null, showData:false };

  componentDidMount() {
    this.checkIsLoggedIn();
    this.getDataFromLocalStorage();
  }

  getDataFromLocalStorage = () => {
    const data = localStorage.getItem("JsonData");
    this.setState({ jsonData: data });
  };


  onClickLogout = () => {
    const { history } = this.props;
    const loginStage = { isLoggedIn: false };
    localStorage.setItem("loginState", JSON.stringify(loginStage));
    history.replace("/login");
  };

  checkIsLoggedIn = async () => {
    let loginStage = await localStorage.getItem("loginState");
    loginStage = JSON.parse(loginStage);
    if (loginStage === null) {
      this.setState({ isLoggedIn: false });
    } else if (loginStage.isLoggedIn === false) {
      this.setState({ isLoggedIn: false });
    }
  };

  readFile = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = (event) => {
      localStorage.setItem("JsonData", event.target.result);
      this.setState({ jsonData: event.target.result });
    };
  };

    onSubmit=(event)=>{
        event.preventDefault();
        this.setState({showData:true})
    }

    

  renderLoggedIn = () => {
    const { jsonData,showData } = this.state;

    return (
      <div className="wrapper">
        <div className="header-container">
            <div>
                <Link className="link" to={"/"}>
                <h1 className="logo">Logo</h1>
                </Link>
            </div>
            <div className="navbar">
            <Link to={"/"} className="link">
              <p className="menu-item">
                    Home
              </p>
            </Link>
            <p
                className="menu-item"
                onClick={this.onClickLogout}
            >
                Logout
            </p>
            </div>
        </div>
        <div className="file-container">
          <div className="inner-container">
            <form onSubmit={this.onSubmit} encType="multipart/form-data" className="form-style">
              <div className="file-upload">
                <div className="file-select">
                  <div className="file-select-button" id="fileName">
                    Choose File
                  </div>
                  <div className="file-select-name" id="noFile">
                    Please Select File and Press Submit
                  </div>
                  <input
                    type="file"
                    ref="file"
                    name="chooseFile"
                    id="chooseFile"
                    placeholder="No File Choosen"
                    accept=".json"
                    onChange={this.readFile}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
              
            </form>
            {jsonData && showData===false && (
                <p className="data-msg">
                  The data has been loaded successfully
                </p>
              )}
          </div>
        </div>
        {showData&&<DataDisplay/>}
        </div>
    );
  };

  renderLoginPage = () => <Redirect to="/login" />;

  render() {
    const { isLoggedIn } = this.state;
    return <>{isLoggedIn ? this.renderLoggedIn() : this.renderLoginPage()}</>;
  }
}

export default withRouter(Home);
