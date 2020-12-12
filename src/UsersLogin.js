import React from "react";
import { Redirect } from "react-router-dom";

class UsersLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "mukul",
      password: "mukul",
      isLogin: false,
      accessToken: "",
    };
    this.handleChangeuserName = this.handleChangeuserName.bind(this);
    this.handleChangepassword = this.handleChangepassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeuserName(event) {
    this.setState({ userName: event.target.value });
  }

  handleChangepassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("Checking wether User exist or not");
    fetch(
      `http://localhost:5000/user?user_name=${this.state.userName}&password=${this.state.password}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ isLogin: true, accessToken: data.accessToken });
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("blahblah");
  }
  render() {
    console.log("state is", this.state);
    if (this.state.isLogin) {
      console.log("redirecting with token:", this.state.accessToken);
      return (
        <Redirect
          to={{
            pathname: "/home",
          }}
        />
      );
    }
    return (
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label className="Form">
            Username:
            <input
              type="text"
              value={this.state.userName}
              onChange={this.handleChangeuserName}
            ></input>
            <br></br>
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChangepassword}
            />
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default UsersLogin;
