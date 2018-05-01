import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import ActionHome from 'material-ui/svg-icons/action/home';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
//eslint-disable-next-line
import { Route, Redirect, Link, withRouter } from 'react-router-dom';
import About from '../About';
import './style.css';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    aboutClick() {
        this.props.history.push('about');
    }
    render() {
        console.log('TaskList_load')
        return (
            <div className='TasklistsPage__menu'>
                <List className='TasklistsPage__list'>
                    <h3 className='TasklistsPage__title'>Almost Google Tasks</h3>
                    <Divider />
                    <List className='TasklistsPage__list'>
                        <ListItem
                            leftIcon={<ActionHome />}
                            primaryText="Home"
                        />
                        <ListItem
                            leftIcon={<ListIcon />}
                            primaryText="About"
                            onClick={this.aboutClick.bind(this)}
                        />
                    </List>
                    <Divider />
                    <Divider />
                    <List className='TasklistsPage__list'>
                        <ListItem
                            leftIcon={<ExitIcon />}
                            primaryText="Log out"
                            onClick={this.handleLogOut}
                        />
                    </List>
                </List>
                <Route exact path='about' component={About} />
            </div>
        );
    }
}

export default withRouter(TaskList);