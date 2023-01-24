import { appConfig } from '../config';
import {updateTaskBegin, updateTaskError, updateTaskSuccess} from '../actions/task';


export default function updateTask(userData) {
  const url = appConfig.API_URL + '/api/update-task-status-box';
  const parameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(userData),
  };

  return dispatch => {
    dispatch(updateTaskBegin());

    fetch(url, parameters)
        .then(res => res.json())
        .then(response => {

          const {success, message} = response;

          if (!success) {
            dispatch(updateTaskError(message));
            return;
          }

          dispatch(updateTaskSuccess());
        })
        .catch(error => dispatch(updateTaskError(error)));
  };
}
