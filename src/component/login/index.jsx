import React, { Component } from "react";
import './style.css';
import RaisedButton from 'material-ui/RaisedButton';
import logo from '../../img/task.png';
import SessionActions from '../../actions/sessionActions';
import SessionStore from '../../stores/sesionStore';
import TaskList from '../TaskList';
import { Route, Redirect } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoginedIn: SessionStore.isLoggedIn(),
            isRedirecting: false
        }
    }
    componentDidMount() {
        SessionStore.addChangeListener(this.onChange)
    }
    componentWillUnmount() {
        SessionStore.removeChangeListener(this.onChange)
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.state.isLoginedIn) this.setState({ isRedirecting: true })
        console.log('willupdate', this.state.isRedirecting)


    }

    handleLogIn() {
        SessionActions.authorize();
    }

    render() {
        return (
            <div>
                <Route exact path="/login" render={() => (
                    SessionStore.isLoggedIn() ? (
                        <Redirect to='tasklist' />
                    ) : (
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
                                        <img alt="sorry ("
                                            src={logo}
                                            className='LoginPage__image'
                                        />
                                    </div>
                                </div>

                            </div>


                        )
                )} />
                {SessionStore.isLoggedIn() ?
                    <Route path='tasklist' component={TaskList} /> :
                    <Route path='login' component={Login} />
                }
            </div>
        )

    }
    onChange = () => {
        this.setState({ isLoginedIn: SessionStore.isLoggedIn() });
    }
}
export default Login;