import React from 'react';
import { Button } from 'antd';
import ShowTodos from './ShowTodos';

class UsersLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: '', password: '', isLogin: false, accessToken: '' };
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
    console.log('Checking wether User exist or not')
    fetch(`http://localhost:5000/user?user_name=${this.state.userName}&password=${this.state.password}`)
      .then(response => response.json())
      .then(data => { console.log(data); this.setState({ isLogin: true, accessToken: data.accessToken }); })
      .catch(err => { console.log(err) });
    console.log('blahblah');

  }
  render() {
    if (this.state.isLogin) {
      return (
        <div>
          <h2>`Welcome ${this.state.userName}`</h2>
          <ShowTodos accessToken={this.state.accessToken} />
        </div>
      )
    }
    return (
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label className="Form">
            Username:
                      <input type="text" value={this.state.userName} onChange={this.handleChangeuserName}></input>
            <br></br>
                      Password:
                    <input type="password" value={this.state.password} onChange={this.handleChangepassword} />
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
export default UsersLogin;
