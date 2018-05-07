import appConst from '../constants/appConst';
import appDisp from '../dispatcher/appDisp';
import api from '../api';
const TaskListActions = {
    loadTaskList() {
        api.listTaskList()
            .then(data => {
                appDisp.dispatch({
                    type: appConst.TASK_LIST_LOAD_SUCCESS,
                    items: data.items
                });
            })
            .catch(err => {
                appDisp.dispatch({
                    type: appConst.TASK_LIST_LOAD_FAIL,
                    items: err
                })
            })
    }

}
export default TaskListActions;