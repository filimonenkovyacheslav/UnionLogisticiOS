import { appConfig } from '../config';
import {signInBegin, signInError, signInSuccess} from '../actions/user';


export default function signIn(body) {
  const url = appConfig.API_URL + '/api/login';
  const parameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body),
  };

  return dispatch => {
    dispatch(signInBegin());

    fetch(url, parameters)
        .then(res => res.json())
        .then(response => {
          const {data} = response;

          if (!data) {
            dispatch(signInError(response));
            return;
          }

          dispatch(signInSuccess(data));
        })
        .catch(error => dispatch(signInError(error)));
  };
}
