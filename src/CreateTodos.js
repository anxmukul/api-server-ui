import { Button } from 'antd';
import React from 'react';

class CreateTodos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: '', title: '', isPosted: false };
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeMessage(event) {
        this.setState({ message: event.target.value });
    }

    handleChangeTitle(event) {
        this.setState({ title: event.target.value });

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
            body: JSON.stringify({ title: this.state.title, message: this.state.message }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({ isPosted: true });
            });
    }

    handleCreateClick = () => {
        this.setState({message: '', title: '', isPosted: false})
    }

    render() {
        if (this.state.isPosted) {
            console.log('again in render')
            return (
                <div className = "After-creation">
                    <h3>Created</h3>
                    <h4>Title: {JSON.stringify(this.state.title)}</h4>
                    <h4>Message: {JSON.stringify(this.state.message)}</h4>
                    <Button onClick={ this.handleCreateClick } type = "primary">Create Notes</Button>
                </div>
            )
        }
        else {
            return (
                <div className = "Creation">
                    <form onSubmit={this.handleSubmit}>
                    <h2>Create new Notes</h2>
                    <label className = "Form">
                    Title:
                      <input type="text" value={this.state.title} onChange={this.handleChangeTitle}></input>
                      <br></br> 
                        Message:
                    <input type="text" value={this.state.message} onChange={this.handleChangeMessage} />
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