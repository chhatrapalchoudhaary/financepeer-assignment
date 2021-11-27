import { Component } from "react";
import Loader from "react-loader-spinner";
import LoginData from "../LoginData";
import Pagination from "../Pagination";
import "./index.css";

class DataDisplay extends Component {
  state = { 
      data: "", 
      isLoading: true,
      currentPage: 1,
      usersPerPage:10,  
    };

  componentDidMount() {
        this.getDataFromLocalStorage();
  }

  getDataFromLocalStorage = () => {
    const data = localStorage.getItem("JsonData");

    this.setState({ data: JSON.parse(data), isLoading: false });
  };

  renderLoader = () => (
    <div className="auth-inner">
      <div testid="loader" className="loader-container">
        <Loader type="Oval" color="#1c8ef9" height={80} width={80} />
      </div>
    </div>
  );


  paginate = pageNumber => this.setState({currentPage:pageNumber});

  renderJsonData = () => {
    const { data,currentPage,usersPerPage } = this.state;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentPosts = data.slice(indexOfFirstUser, indexOfLastUser);
    return (
        <div className="data-display">
          {currentPosts.map((eachUser) => (
            <LoginData key={eachUser.id} userDetails={eachUser} />
          ))}
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={data.length}
            paginate={this.paginate}
            currentPage={currentPage}
            
            />
        </div>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="auth-wrapper">
        {isLoading ? this.renderLoader() : this.renderJsonData()}
      </div>
    );
  }
}

export default DataDisplay;
