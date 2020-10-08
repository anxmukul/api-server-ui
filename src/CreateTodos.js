import React from 'react';

class CreateTodos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: '', time: '', isPosted: false };
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeMessage(event) {
        this.setState({ message: event.target.value });
    }

    handleChangeTime(event) {
        this.setState({ time: event.target.value });

    }

    handleSubmit(event) {
        console.log('value  was submitted: ');
        console.log(this.state)
        event.preventDefault();
        fetch('https://guarded-taiga-87327.herokuapp.com/todo', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time: this.state.time, message: this.state.message }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({ isPosted: true });
            });
    }

    handleCreateClick = () => {
        this.setState({message: '', time: '', isPosted: false})
    }

    render() {
        if (this.state.isPosted) {
            console.log('again in render')
            return (
                <div className = "After-creation">
                    <h3>ceated</h3>
                    <h4>Time: {JSON.stringify(this.state.time)}</h4>
                    <h4>Message: {JSON.stringify(this.state.message)}</h4>
                    <button onClick={ this.handleCreateClick }>Create Todos</button>
                </div>
            )
        }
        else {
            return (
                <div className = "Creation">
                    <form onSubmit={this.handleSubmit}>
                    <h2>Create new todo</h2>
                    <label className = "Form">
                        Message:
                    <input type="text" value={this.state.message} onChange={this.handleChangeMessage} />
                    <br></br>
                    Time:
                      <input type="text" value={this.state.time} onChange={this.handleChangeTime}></input>
                    </label>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
                </div>
               
            );
        }
    }
}

export default CreateTodos;