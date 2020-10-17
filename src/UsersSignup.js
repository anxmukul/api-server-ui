import React from 'react';
import { Button } from 'antd';
class UsersSignup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {userName: '', password: '', isSignup: false};
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
    console.log(this.state)
    event.preventDefault();
    fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: this.state.userName, password: this.state.password }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.setState({ isSignup: true });
        });
  }
    render(){
      if(this.state.isSignup){
          return(
            <div>
               <h1>Account Created</h1>
               <h3>Welcome!</h3>
               
            </div>
           
          )
      }
      else {
        return (
          <div className = "Signin">
            <h1>Welcome! To my notes</h1>
            <form onSubmit={this.handleSubmit}>
                    <h2>Sign Up</h2>
                    <label className = "Form">
                    Username:
                      <input type="text" value={this.state.userName} onChange={this.handleChangeuserName}></input>
                      <br></br> 
                      Password:
                    <input type="text" value={this.state.password} onChange={this.handleChangepassword} />
                    </label>
                    <br></br>
                    <input type="submit" value="Create Account" />
                </form>
               
          </div>
        )
      }
      }
      
}
export default UsersSignup;
