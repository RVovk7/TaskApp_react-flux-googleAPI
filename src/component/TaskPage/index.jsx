import React,{Component} from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import TasksActions from '../../actions/TasksActions';
import TasksStore from '../../stores/TasksStore';
//import TaskListsStore from '../../stores/TaskListsStore';
import Task from '../Task';
import './style.css';

class TaskPage extends Component {
    constructor(props){
super(props)
this.state = {
  tasks: TasksStore.getTasks()
}
    }

 componentWillMount(){
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
handleTaskUpdate(taskId, { text }) {
    TasksActions.updateTask({
        taskListId: this.props.match.params.id,
        taskId: taskId,
        text: text
    });
}
render(){
    return(
        <div >
         <Paper className='TasksPage' zDepth={3}>
        <div className='TasksPage__header'>
            <h2 className='TasksPage__title'>List name</h2>
                <IconButton>
                    <ContentAdd />
                </IconButton>
        </div>
        <div className='TasksPage__tasks'>    
        {
                        this.state.tasks.map(task =>
                            <Task
                                key={task.id}
                                text={task.text}
                                isCompleted={task.isCompleted}
                                //onStatusChange={this.handleStatusChange.bind(null, task.id)}
                                //onUpdate={this.handleTaskUpdate.bind(null, task.id)}
                            />
                        )
                    }
        </div>
        </Paper>
        </div>
    )
}
onChange = () => {
    this.setState({ tasks: TasksStore.getTasks() })
}
}
export default TaskPage;