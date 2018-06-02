import appDisp from '../dispatcher/appDisp';
import appConst from '../constants/appConst';
import api from '../api';
const TasksActions = {
    loadTasks(taskListId) {
        api.listTasks(taskListId)
        .then(data => {
            console.log(data);
            appDisp.dispatch({
                type  : appConst.TASKS_LOAD_SUCCESS,
                items : data.items || []
            });
        })
        .catch(err => {
            appDisp.dispatch({
                type  : appConst.TASKS_LOAD_FAIL,
                error : err
            });
        });
    },
    updateTaskStatus(params) {
        api.updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            status: params.isCompleted ? 'completed' : 'needsAction'
        })
        .then(data => {
            appDisp.dispatch({
                type   : appConst.TASK_UPDATE_SUCCESS,
                task   : data,
                taskId : params.taskId
            });
        })
        .catch(err => {
            appDisp.dispatch({
                type  : appConst.TASK_UPDATE_FAIL,
                error : err
            });
        });
    },

    updateTask(params) {
        api.updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            title: params.text
        })
        .then(data => {
            appDisp.dispatch({
                type   : appConst.TASK_UPDATE_SUCCESS,
                task   : data,
                taskId : params.taskId
            });
        })
        .catch(err => {
            appDisp.dispatch({
                type  : appConst.TASK_UPDATE_FAIL,
                error : err
            });
        });
    },

    createTask(params) {
        api.insertTask({
            taskListId: params.taskListId,
            title: params.text
        })
        .then(data => {
            appDisp.dispatch({
                type : appConst.TASK_CREATE_SUCCESS,
                task : data
            });
        })
        .catch(err => {
            appDisp.dispatch({
                type  : appConst.TASK_CREATE_FAIL,
                error : err
            });
        });
    },
};

export default TasksActions;