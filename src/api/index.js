/* global gapi */
const CLIENT_ID = '1045159814305-a2vcmjg4g0ke0ekgio1jnqqgbu37nkfn.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me'];
export default {
    authorize(params) {
        return new Promise((resolve, reject) => {
            gapi.auth.authorize({
                    'client_id': CLIENT_ID,
                    'scope': SCOPES,
                    'immediate': params.immediate,
                    'cookie_policy': 'single_host_origin'
                },
                authResult => {
                      if (authResult.error) {
                        return reject(authResult.error);
                    }  

                    return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve() ) );
                }
            )

        });
    }


}