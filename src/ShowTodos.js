import React from 'react';
import UpdateTodos from './UpdateTodos';

class ShowTodos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: ['blah'], isFetchComplete: false, updateRequest: false, todoID: -1, todoMessage: '', todoTime: '' };
  }

  fetchData = () => {
    this.setState({ todos: 'Fetching', isFetchComplete: false });
    console.log('blahblah')
    fetch('http://localhost:5000/todo')
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

  getTableData = (err, data) => {
    return this.state.todos.map((todo) => {
      return (<tr><td>{todo.message}</td>
        <td>{todo.time}</td>
        <td><button onClick={() => this.updateTodo(todo.todo_id, todo.message, todo.time)}>update</button></td></tr>)
    })
  }

  render() {
    console.log('called', this.state)
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
        <div className="Table"><table id='todos'>
          <h1>My Todos</h1>
          <tbody>
            {this.getTableData()}
          </tbody>
        </table >
          <button onClick={this.fetchData} className="Button">Show Todos</button>
        </div>)
    }
    else {
      console.log('in else')
      return (
        <div className="Main">
          <h1>My Todos</h1>
          <button onClick={this.fetchData}>Show Todos</button>
          <h2>{JSON.stringify(this.state.todos)}.</h2>
        </div>
      );
    }
  }
}

export default ShowTodos;
