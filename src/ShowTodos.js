import React from 'react';

class ShowTodos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: ['blah'], isFetchComplete: false };
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

  getTableData = () => {
    return this.state.todos.map((todo) => {
      return <tr><td>{todo.message}</td><td>{todo.time}</td></tr>
    })
  }

  render() {
    console.log('called', this.state)
    if (this.state.isFetchComplete) {
      return (
      <div className="Table"><table id='todos'>
        <h1>My Todos</h1>
        <tbody>
          {this.getTableData()}
        </tbody>
      </table > 
      <button onClick={this.fetchData} className = "Button">Show Todos</button>
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
