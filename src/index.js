/* global gapi */
import React from 'react';
import  {render} from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SessionActions from './actions/sessionActions';
gapi.load('auth',()=>{
  SessionActions.authorize(true,  renderApp);
})
let renderApp = () =>{
    render(
      < Router  >
  <Route exat path="/" component = {App}/> 
    </ Router>
    , document.getElementById('root'));
 
}
    
  

