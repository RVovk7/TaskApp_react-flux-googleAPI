import React, {Component} from 'react';
import Checkbox from 'material-ui/Checkbox';
import './style.css';
 class Task extends Component {
     constructor(props) {
         super(props);
         this.state = {  };
     }
     render() {
         return (
             <div className="Task" >
             <Checkbox 
             className='Task__checkbox'
             checked={this.props.isCompleted}
             />
             <div className='Task__text'>
                 <div className='Task__title' >{this.props.text}</div>
             </div>
             </div>
         );
     }
 }
 
 export default Task;