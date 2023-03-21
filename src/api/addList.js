import { appConfig } from '../config';
import {addListBegin, addListError, addListSuccess} from '../actions/addList';


export default function addList(body) {
  const url = body.serverName + '/api/add-tracking-list';
  const parameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body),
  };

  return dispatch => {
    dispatch(addListBegin());

    fetch(url, parameters)
        .then(res => res.json())
        .then(response => {
          const {success, message} = response;

          if (!success) {
            dispatch(addListError(response));
            return;
          }

          dispatch(addListSuccess(message));
        })
        .catch(error => dispatch(addListError(error)));
  };
}
