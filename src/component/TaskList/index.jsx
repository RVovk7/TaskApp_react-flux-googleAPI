import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import ActionHome from 'material-ui/svg-icons/action/home';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import AddIcon from 'material-ui/svg-icons/content/add';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import { Route, withRouter } from 'react-router-dom';
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
    aboutClick = () => {
        this.props.history.push('/tasklist/about');
    }
    taskClick = list => {
        this.props.history.push(`/tasklist/${list.id}`);
    }
    render() {
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
                            />
                            <ListItem
                                leftIcon={<ListIcon />}
                                primaryText="About"
                                onClick={this.aboutClick}
                            />
                        </List>
                        <Divider />
                        <List className='TasklistsPage__list' subheader="Task Lists">
                            {
                                this.state.taskList.length !== 0 ? this.state.taskList.map(list =>
                                    <ListItem
                                        key={list.id}
                                        leftIcon={<FolderIcon />}
                                        primaryText={list.name}
                                    // onClick={this.props.history.push(`/tasklist/${list.id}`)}
                                    />
                                ) :
                                    <div></div>
                            }
                        </List>
                        <ListItem
                            leftIcon={<AddIcon />}
                            primaryText="Create new list"
                            onClick={this.handleAddTaskList}
                        />
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