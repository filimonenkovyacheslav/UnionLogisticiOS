import { appConfig } from '../config';
import {addDataBegin, addDataError, addDataSuccess} from '../actions/addData';


export default function addData(body) {
  const url = appConfig.API_URL + '/api/add-data-with-tracking';
  const parameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body),
  };

  return dispatch => {
    dispatch(addDataBegin());

    fetch(url, parameters)
        .then(res => res.json())
        .then(response => {
          const {success, message} = response;

          if (!success) {
            dispatch(addDataError(response));
            return;
          }

          dispatch(addDataSuccess(message));
        })
        .catch(error => dispatch(addDataError(error)));
  };
}
