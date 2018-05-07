import {
    EventEmitter
} from 'events';
import appConst from '../constants/appConst';
import appDisp from '../dispatcher/appDisp';

const CHANGE_EVENT = 'change';

let _taskLists = [];
//eslint-disable-next-line
let _error = null;

function formatTaskList(data) {
    return {
        id: data.id,
        name: data.title
    };
}
const TaskListsStore = Object.assign({}, EventEmitter.prototype, {
    getTaskLists() {  
        return _taskLists;
    },
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});
appDisp.register(function (action) {
    switch (action.type) {
        case appConst.TASK_LIST_LOAD_SUCCESS:
            {
                _taskLists = action.items.map(formatTaskList);
                TaskListsStore.emitChange();
                break;
            }
        case appConst.TASK_LIST_LOAD_FAIL:
            {
                _taskLists = [];
                _error = action.error;
                TaskListsStore.emitChange();
                break;
            }
        default:
            {}
    }
});
export default TaskListsStore;