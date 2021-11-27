import { Component } from "react";

import "./index.css";

class LoginData extends Component {

  render() {
    const { userDetails } = this.props;
    console.log(userDetails);

    const { userId, id, title, body } = userDetails;

    return (
      <div className="data-container">
        <div className="ids">
          <p className="user-item-user-id">userId: {userId}</p>
          <p className="user-item-post-id">postId: {id}</p>
        </div>
        <h1 className="user-item-title">
          {title}
        </h1>
        <p className="user-item-body">
          {body}
        </p>
      </div>
    );
  }
}

export default LoginData;
