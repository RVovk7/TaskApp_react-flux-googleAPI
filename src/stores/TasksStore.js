import { EventEmitter } from 'events';

import appDisp from '../dispatcher/appDisp';
import appConst from '../constants/appConst';

const CHANGE_EVENT = 'change';

let _tasks = [];
//eslint-disable-next-line
let _error = null;

function formatTask(data) {
    return {
        id          : data.id,
        text        : data.title,
        notes       : data.notes,
        dueTime     : data.due ? new Date(data.due) : '',
        isCompleted : data.status === 'completed',
        position    : data.position
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    getTasks() {
        return _tasks;
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

appDisp.register(function(action) {
    switch(action.type) {
        case appConst.TASKS_LOAD_SUCCESS: {
            _tasks = action.items.map(formatTask);

            TasksStore.emitChange();
            break;
        }

        case appConst.TASKS_LOAD_FAIL: {
            _tasks = [];
            _error = action.error;

            TasksStore.emitChange();
            break;
        }

        case appConst.TASK_UPDATE_SUCCESS: {
            const updatedTaskIndex = _tasks.findIndex(task => task.id === action.taskId);
            _tasks[updatedTaskIndex] = formatTask(action.task);

            TasksStore.emitChange();
            break;
        }

        case appConst.TASK_CREATE_SUCCESS: {
            const newTask = formatTask(action.task);
            _tasks.unshift(newTask);

            TasksStore.emitChange();
            break;
        }

        default: {
        }
    }
});

export default TasksStore;