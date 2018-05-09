import React,{Component} from 'react';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './style.css';
class TaskPage extends Component {
render(){
    return(
        <div className='TasksPage'>
        <div className='TasksPage__header'>
            <h2 className='TasksPage__title'>List name</h2>
                <IconButton>
                    <ContentAdd />
                </IconButton>
        </div>
        <div className='TasksPage__tasks'>
        Task
        </div>
        </div>
    )
}
}
export default TaskPage;