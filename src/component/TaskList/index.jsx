import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import ActionHome from 'material-ui/svg-icons/action/home';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
//eslint-disable-next-line
import { Route, Redirect, Link, withRouter } from 'react-router-dom';
import TaskListsStore from '../../stores/TaskListsStore';
import TaskListActions from '../../actions/TaskListActions';
import About from '../About';
import './style.css';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: TaskListsStore.getTaskLists()
        };
    }
    componentWillMount() {
        TaskListActions.loadTaskList();
    }
    componentDidMount() {
        TaskListsStore.addChangeListener(this.onChange)
    }
    componentWillUnmount() {
        TaskListsStore.removeChangeListener(this.onChange)
    }
    aboutClick() {
        console.log()
        this.props.history.push('/tasklist/about');
    }
    /* homeClick(){
        this.props.history.push('/tasklist');
    } */
    render() {
        console.log('TaskList_load')
        return (
            <div className='TasklistsPage' >
                <div className='TasklistsPage_menu'>
                    <List className='TasklistsPage_list'>
                        <h3 className='TasklistsPage_title'>Almost Google Tasks</h3>
                        <Divider />
                        <List className='TasklistsPage_list'>
                            <ListItem
                                leftIcon={<ActionHome />}
                                primaryText="Home"
                            //onClick={this.homeClick.bind(this)}
                            />
                            <ListItem
                                leftIcon={<ListIcon />}
                                primaryText="About"
                                onClick={this.aboutClick.bind(this)}
                            />
                        </List>
                        <Divider />
                        <Divider />
                        <List className='TasklistsPage_list'>
                            <ListItem
                                leftIcon={<ExitIcon />}
                                primaryText="Log out"
                                onClick={this.handleLogOut}
                            />
                        </List>
                    </List>
                </div >
                <div className='TasklistsPage_tasks'>
                    <Route exact path='/tasklist/about' component={About} />
                </div>

            </div>

        );
    }
    onChange = () => {
        this.setState({ taskList: TaskListsStore.getTaskLists() })
    }
}
export default withRouter(TaskList);