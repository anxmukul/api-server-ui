import React from 'react';
import UpdateTodos from './UpdateTodos';
import { Button } from 'antd';
import {
  Redirect, Link
} from "react-router-dom";


class ShowTodos extends React.Component {
  constructor(props) {
    console.log('props ye h:', props)
    super(props);
    this.state = { accessToken:this.getAccessTokenFromLocalStorageSafely(), todos: [''], isFetchComplete: false, updateRequest: false, deleteRequest: false, forid: -1, todoMessage: '', todotitle: '' };
  }

  getAccessTokenFromLocalStorageSafely = () => {
    if (localStorage.getItem("user") !== null) {
      console.log(localStorage.getItem("user"))
      return JSON.parse(localStorage.getItem("user")).accessToken
    }
    return '';
  }

  fetchData = () => {
    this.setState({ todos: 'Fetching', isFetchComplete: false });
    console.log('blahblah')
    fetch('http://localhost:5000/todo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.state.accessToken
      }
    })
      .then(response => response.json())
      .then(data => { console.log(data); this.setState({ todos: data, isFetchComplete: true }) })
      .catch(err => { this.setState({ todos: 'Failed' }) });
    console.log('bloopbloop')

  }
  updateTodo = (arg, arg1, arg2) => {
    console.log('Inside update Component', arg);
    this.setState({ updateRequest: true, forid: arg, todoMessage: arg1, todotitle: arg2 });
    console.log(this.state.forid);

  }
  deleteTodo = (arg) => {
    console.log('Inside delete Component', arg);
    this.setState({ deleteRequest: true, forid: arg });
    console.log(this.state.forid);
    fetch(`https://guarded-taiga-87327.herokuapp.com/todo/${arg}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', },
    })
      .then(data => {
        console.log('Success:', data);
      });
  }

  getTableData = (err, data) => {
    return this.state.todos.map((todo) => {
      return (<tr><td>{todo.title}</td>
        <td>{todo.message}</td>
        <td><Button onClick={() => this.updateTodo(todo.id, todo.message, todo.title)} type="primary">Update</Button></td>
        <td><Button onClick={() => this.deleteTodo(todo.id)} type="ghost">Delete</Button></td></tr>)
    })
  }

  render() {
    console.log('called', this.state)
    if (localStorage.getItem("user") === null) {
      return <Redirect
        to={{
          pathname: "/login"
        }}
      />
    }
    if (this.state.deleteRequest) {
      return (
        <div className="Deletion">
          <h4>Deleted</h4>
        </div>
      )
    }
    if (this.state.updateRequest) {
      console.log(this.state);
      return (
        <div>
          <UpdateTodos id={this.state.forid} title={this.state.todotitle} message={this.state.todoMessage} />
        </div>
      )
    }
    if (this.state.isFetchComplete) {
      return (
        <div className="Table">
          <table id='todos'>
            <h1>My Notes</h1>
            <tbody>
              {this.getTableData()}
            </tbody>
          </table >
          <Button onClick={this.fetchData} type="primary">Show Notes</Button>
          {/* <button className="Button"></button> */}
        </div>)
    }
    else {
      console.log('in else')
      return (
        <div className="Main">
          <h1>Your Personal Notes</h1>
          <Button onClick={this.fetchData} type="primary">Show Notes</Button>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          {/* <h2>{JSON.stringify(this.state.todos)}.</h2> */}
        </div>
      );
    }
  }
}

export default ShowTodos;
