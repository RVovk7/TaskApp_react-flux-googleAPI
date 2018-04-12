import React from 'react';
import  {render} from 'react-dom';
import App from './App';
//import api from './api';
import SessionActions from './actions/sessionActions';
window['handleGoogleApiLoaded'] = () => {
  SessionActions.authorize(true, renderApp);
 }
  function renderApp(){
    render(<App />, document.getElementById('root'));
  }

