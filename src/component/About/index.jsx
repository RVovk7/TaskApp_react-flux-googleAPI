import React, {Component} from 'react';
//import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import './style.css';

class About extends Component {
    render() {
        return ( 
            <div className='AboutPage'>

                <Paper zDepth={5}  className='AboutPage__content'>
                    <h2> Almost Google Tasks </h2>
                    <p>This application is written based on <a href='https://developers.google.com/google-apps/tasks/'>
                    Google Tasks API</a> using Material Design concepts.</p>
                    <p>It is a final result of ReactJS Essential Course.</p>
                </Paper>
    
            </div>
           
        );
    }
}
export default About;