import React from 'react';
import { Button } from 'antd';
class UpdateTodos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: this.props.message, title: this.props.title, isUpdated: false, showTodo: false }
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeMessage(event) {
        console.log('sfdfsf')
        this.setState({ message: event.target.value });
    }

    handleChangeTitle(event) {
        console.log('sfdfsf')
        this.setState({ title: event.target.value });

    }
    handleCreateClick = () => {
        this.setState({ showTodo: true });
    }
    handleSubmit(event) {
        console.log('value  was submitted: ');
        console.log(this.state)
        event.preventDefault();
        fetch(`https://guarded-taiga-87327.herokuapp.com/todo/${this.props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: this.state.title, message: this.state.message }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({ isUpdated: true });
            });
    }
    render() {
        console.log('Inside render of update todos')
        if (this.state.showTodo) {
            return (
                <div className = "Table">
                    <table>
                        <tr>
                        <td>{this.state.title}</td>
                            <td>{this.state.message}</td>
                        </tr>
                    </table>
                </div>
            )
        }
        if (this.state.isUpdated) {
            return (
                <div className="After-updation">
                    <h3>Updated</h3>
                    <h4>Title: {JSON.stringify(this.state.title)}</h4>
                    <h4>Message: {JSON.stringify(this.state.message)}</h4>
                    <Button onClick={this.handleCreateClick} type = "primary">Show Notes</Button>
                </div>
            )
        }
        return (
            <div className="Update">
                <h3>Your Notes id {this.props.id}</h3>
                <form onSubmit={this.handleSubmit}>
                    <h2>Update Notes</h2>
                    <label>
                    Title:
                      <input type="text" value={this.state.title} onChange={this.handleChangeTitle}></input>
                      <br></br>
                        Message:
                    <input type="text" value={this.state.message} onChange={this.handleChangeMessage} />                   
                    </label>
                    <br></br>
                    <input type="submit" value="Update" />
                </form>
            </div>

        )
    }
}
export default UpdateTodos;