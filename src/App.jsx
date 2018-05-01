import React,{Component} from "react";
import Login from './component/Login';
//eslint-disable-next-line
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import SessionStore from './stores/sesionStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TaskList from './component/TaskList';

 class App extends Component {

  render() {

    return(
      <MuiThemeProvider>
      <div>
             <Route exact path="/" render={() => (
   SessionStore.isLoggedIn()  ? (
    <Redirect to='tasklist'/>
    ) : (
      <Redirect to="/login"/>
    )
  )}/>
  { SessionStore.isLoggedIn() ? <Route path='/tasklist' component={TaskList} /> :
  <Route path='/login' component={Login} />}
  
          </div>
          </MuiThemeProvider>
    )
    
  }
}
export default App; 


/* const App = (props) => {
  return(
    <MuiThemeProvider>
    <div>
           <Route  path="/" render={() => (
 SessionStore.isLoggedIn()  ? (
  <Redirect to='logged'/>
  ) : (
    <Redirect to="/login"/>
  )
)}/>
{ SessionStore.isLoggedIn() ? <Route path='/logged' component={LoggedPage} /> :
<Route path='/login' component={Login} />}

        </div>
        </MuiThemeProvider>
  )
} 
export default App; */













