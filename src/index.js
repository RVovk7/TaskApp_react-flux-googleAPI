import React from 'react';
import  {render} from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import api from './api';
import SessionActions from './actions/sessionActions';
window.handleGoogleApiLoaded = () => {
  console.info('API loaded')
  SessionActions.authorize(true,  renderApp);
 } 
let renderApp = () =>{
    render(
      < Router  >
  <Route exat path="/" component = {App}/> 
    {/*  <Route exat path="/" render={props => <App {...props}/>}/>  */}
    </ Router>
    , document.getElementById('root'));
 
}
    
  

