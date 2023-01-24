import { appConfig } from '../config';
import {fetchTasksBegin, fetchTasksError, fetchTasksSuccess} from '../actions/tasks';


export default function fetchTasks(userData) {
  const url = appConfig.API_URL + '/api/get-courier-tasks?';
  let params = ''
  for (let v in userData) {
    if (userData.hasOwnProperty(v)) {
      params += v+'='+userData[v]+'&'
    }
  }
  params = params.substring(0, params.length - 1)

  const parameters = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    }
  };

  return dispatch => {
    dispatch(fetchTasksBegin());

    fetch(url+params, parameters)
        .then(res => res.json())
        .then(response => {

          const {success, data, message} = response;

          if (!success) {
            dispatch(fetchTasksError(message));
            return;
          }

          dispatch(fetchTasksSuccess(data));
        })
        .catch(error => dispatch(fetchTasksError(error)));
  };
}
