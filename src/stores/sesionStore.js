import { EventEmitter} from 'events';
import appConst from '../constants/appConst';
import appDisp from '../dispatcher/appDisp';

const CHANGE_EVENT = 'change';
let _isLoggedIn = false;
const SessionStore = Object.assign({}, EventEmitter.prototype, {
    isLoggedIn() {
        return _isLoggedIn;
    },
    emitChange() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }
});
appDisp.register(action => {
    console.info(action.type, action);
    switch (action.type) {
      

  case appConst.SESSION_AUTHORIZE_SUCCESS:
            {
                _isLoggedIn = true;
                SessionStore.emitChange();
                break;
            }
        case appConst.SESSION_AUTHORIZE_FAIL:
            {
                _isLoggedIn = false;
                SessionStore.emitChange();
                break;
            }
            default:  _isLoggedIn = false;
             
    }
});
export default SessionStore;