import React, { Component } from "react";
import './style.css';
import RaisedButton from 'material-ui/RaisedButton';
import logo from '../../img/task.png';
import SessionActions from '../../actions/sessionActions';
import SessionStore from '../../stores/sesionStore';
import { withRouter } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoginedIn: SessionStore.isLoggedIn()
        }
    }
    componentDidMount() {
        SessionStore.addChangeListener(this.onChange)
    }
    componentWillUnmount() {
        SessionStore.removeChangeListener(this.onChange)
    }
    componentWillUpdate(nextProps, nextState) {
        if (SessionStore.isLoggedIn()) {
            const { logUp, history } = this.props;
            logUp();
            history.replace('/tasklist');
        }
    }
    handleLogIn() {
        SessionActions.authorize();
    }
    render() {
        return (
            <div>
                <div >
                    <div className='Login'>
                        <div className='Login_banner'>
                            <div className='Login_text'>
                                <h1>Task</h1>
                                <p>Organise your life!</p>
                                <RaisedButton
                                    className='login-button'
                                    label='Log in with Google'
                                    onClick={this.handleLogIn}
                                />
                            </div>
                            <img alt="logo fail"
                                src={logo}
                                className='LoginPage__image'
                            />
                        </div>
                    </div>
                </div>
                )
            </div>
        )
    }
    onChange = () => {
        this.setState({ isLoginedIn: SessionStore.isLoggedIn() });
    }
}
export default withRouter(Login);