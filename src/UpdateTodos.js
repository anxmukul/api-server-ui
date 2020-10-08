import React from 'react';
import { Button } from 'antd';
class UpdateTodos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: this.props.message, time: this.props.time, isUpdated: false, showTodo: false }
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeMessage(event) {
        console.log('sfdfsf')
        this.setState({ message: event.target.value });
    }

    handleChangeTime(event) {
        console.log('sfdfsf')
        this.setState({ time: event.target.value });

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
            body: JSON.stringify({ time: this.state.time, message: this.state.message }),
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
                        <tr><td>{this.state.message}</td>
                            <td>{this.state.time}</td>
                        </tr>
                    </table>
                </div>
            )
        }
        if (this.state.isUpdated) {
            return (
                <div className="After-updation">
                    <h3>Updated</h3>
                    <h4>Time: {JSON.stringify(this.state.time)}</h4>
                    <h4>Message: {JSON.stringify(this.state.message)}</h4>
                    <Button onClick={this.handleCreateClick} type = "primary">Show Todos</Button>
                </div>
            )
        }
        return (
            <div className="Update">
                <h3>Your todo id {this.props.id}</h3>
                <form onSubmit={this.handleSubmit}>
                    <h2>Update todo</h2>
                    <label>
                        Message:
                    <input type="text" value={this.state.message} onChange={this.handleChangeMessage} />
                        <br></br>
                    Time:
                      <input type="text" value={this.state.time} onChange={this.handleChangeTime}></input>
                    </label>
                    <br></br>
                    <input type="submit" value="Update" />
                </form>
            </div>

        )
    }
}
export default UpdateTodos;