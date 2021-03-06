import React, { Component } from "react";
//eslint-disable-next-line
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import SessionStore from './stores/sesionStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TaskList from './component/TaskList';
import Login from './component/Login';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LoggedIn: SessionStore.isLoggedIn()
    }
  }
  logUp = () => {
    this.setState({
      LoggedIn: true
    })
  }
  componentWillMount() {
    if (this.state.LoggedIn) {
      this.props.history.replace('/tasklist')
    }
    else {
      this.props.history.replace('/login')
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          {
            this.state.LoggedIn ?
              <Route path='/tasklist' component={TaskList} /> :
              <Route path='/login' render={() => (
                <Login logUp={this.logUp} />
              )} />
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(App);














