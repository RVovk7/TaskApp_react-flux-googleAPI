import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import TasksActions from '../../actions/TasksActions';
import TasksStore from '../../stores/TasksStore';
import TaskCreateModal from '../TaskCreateModal';
import Task from '../Task';
import './style.css';
class TaskPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: TasksStore.getTasks(),
            isCreatingTask: false
        }
    }
    componentWillMount() {
        TasksActions.loadTasks(this.props.match.params.id)
    }
    componentDidMount() {
        TasksStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        TasksStore.removeChangeListener(this.onChange);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            TasksActions.loadTasks(nextProps.match.params.id);
        }
    }
    handleTaskUpdate = (taskId, { text }) => {
        TasksActions.updateTask({
            taskListId: this.props.match.params.id,
            taskId: taskId,
            text: text
        });
    }
    handleStatusChange = (taskId, { isCompleted }) => {
        TasksActions.updateTaskStatus({
            taskListId: this.props.match.params.id,
            taskId: taskId,
            isCompleted: isCompleted
        });
    }
    handleAddTask = () => {
        this.setState({ isCreatingTask: true });
    }

    handleClose = () => {
        this.setState({ isCreatingTask: false });
    }
    handleTaskSubmit =task => {
        const taskListId = this.props.match.params.id;

        TasksActions.createTask({ taskListId, ...task });

        this.setState({ isCreatingTask : false });
    }
    render() {
        return (
            <div >
                <Paper className='TasksPage' zDepth={3}>
                    <div className='TasksPage__header'>
                        <h2 className='TasksPage__title'>List name</h2>
                        <IconButton>
                            <ContentAdd className='addButton' onClick={this.handleAddTask} />
                        </IconButton>
                    </div>
                    <div className='TasksPage__tasks'>
                        {
                            this.state.tasks.map(task =>
                                <Task
                                    key={task.id}
                                    text={task.text}
                                    isCompleted={task.isCompleted}
                                    onStatusChange={this.handleStatusChange.bind(this, task.id)}
                                    onUpdate={this.handleTaskUpdate.bind(null, task.id)}
                                />
                            )
                        }
                    </div>
                </Paper>
                <TaskCreateModal
                    isOpen={this.state.isCreatingTask}
                    onSubmit={this.handleTaskSubmit}
                    onClose={this.handleClose}
                />
            </div>
        )
    }
    onChange = () => {
        this.setState({ tasks: TasksStore.getTasks() })
    }
}
export default TaskPage;