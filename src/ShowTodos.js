import React from 'react';
import UpdateTodos from './UpdateTodos';
import { Button } from 'antd';

class ShowTodos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [''], isFetchComplete: false, updateRequest: false, deleteRequest: false, todoID: -1, todoMessage: '', todoTime: '' };
  }

  fetchData = () => {
    this.setState({ todos: 'Fetching', isFetchComplete: false });
    console.log('blahblah')
    fetch('https://guarded-taiga-87327.herokuapp.com/todo')
      .then(response => response.json())
      .then(data => { console.log(data); this.setState({ todos: data, isFetchComplete: true }) })
      .catch(err => { this.setState({ todos: 'Failed' }) });
    console.log('bloopbloop')

  }
  updateTodo = (arg, arg1, arg2) => {
    console.log('Inside update Component', arg);
    this.setState({ updateRequest: true, todoID: arg, todoMessage: arg1, todoTime: arg2});
    console.log(this.state.todoID);

  }
  deleteTodo = (arg) => {
    console.log('Inside delete Component', arg);
    this.setState({deleteRequest: true, todoID: arg});
    console.log(this.state.todoID);
    fetch(`https://guarded-taiga-87327.herokuapp.com/todo/${arg}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time: this.state.time, message: this.state.message }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            });
  }

  getTableData = (err, data) => {
    return this.state.todos.map((todo) => {
      return (<tr><td>{todo.message}</td>
        <td>{todo.time}</td>
        <td><Button onClick={() => this.updateTodo(todo.todo_id, todo.message, todo.time)} type = "primary">Update</Button></td>
        <td><Button onClick={() => this.deleteTodo(todo.todo_id)} type = "ghost">Delete</Button></td></tr>)
    })
  }

  render() {
    console.log('called', this.state)
    if(this.state.deleteRequest){
      return (
        <div className = "Deletion">
        <h4>Deleted</h4>
      </div>
      )
    }
    if (this.state.updateRequest) {
      console.log(this.state);
      return (
        <div>
          <UpdateTodos id={this.state.todoID} time={this.state.todoTime} message = {this.state.todoMessage}/>
        </div>
      )
    }
    if (this.state.isFetchComplete) {
      return (
        <div className="Table">
          <table id='todos'>
          <h1>My Todos</h1>
          <tbody>
            {this.getTableData()}
          </tbody>
        </table >
          <Button onClick={this.fetchData}  type="primary">Show Todos</Button>
          {/* <button className="Button"></button> */}
        </div>)
    }
    else {
      console.log('in else')
      return (
        <div className="Main">
          <h1>Your Personal Todos</h1>
          <Button onClick={this.fetchData} type = "primary">Show Todos</Button> 
          {/* <h2>{JSON.stringify(this.state.todos)}.</h2> */}
        </div>
      );
    }
  }
}

export default ShowTodos;
