import { appConfig } from '../config';
import {newPackingBegin, newPackingError, newPackingSuccess} from '../actions/newPacking';


export default function createNewPacking(body) {
  const url = appConfig.API_URL + '/api/add-new-signed-form';
  const parameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body),
  };

  return dispatch => {
    dispatch(newPackingBegin());

    fetch(url, parameters)
        .then(res => res.json())
        .then(response => {
          const {data} = response;

          if (!data) {
            dispatch(newPackingError(response));
            return;
          }

          dispatch(newPackingSuccess(data));
        })
        .catch(error => dispatch(newPackingError(error)));
  };
}
