import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UsersSignup from './UsersSignup';
import UsersLogin from './UsersLogin'
import Root from './Root'
import ShowTodos from './ShowTodos';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/login">
            <UsersLogin />
          </Route>
          <Route exact path="/signup">
            <UsersSignup />
          </Route>
          <Route exact path="/">
            <Root />
          </Route>
          <Route exact path="/home" render={(props) => <ShowTodos {...props} />} />
        </Switch>
    </Router>
  );
}

export default App;
