import appConst from '../constants/appConst';
import appDisp from '../dispatcher/appDisp';
import api from '../api';

const SessionActions = {
    authorize(immediate = false, callback) {
        api.authorize({ immediate   })
            .then(() => {
                appDisp.dispatch({
                    type: appConst.SESSION_AUTHORIZE_SUCCESS
                });
                
               if (callback) {
                callback();
                console.log('run render')
               } 
            })
            .catch((err) => {
                console.log('not sec')
                appDisp.dispatch({
                    type: appConst.SESSION_AUTHORIZE_FAIL,
                    error: err
                
                });
                
                if (callback) {
                    callback();
                    console.log('second')
                   } 
              
            });
    }
};


export default SessionActions;