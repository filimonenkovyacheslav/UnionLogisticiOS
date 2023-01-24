import { appConfig } from '../config';
import {duplicatePackingBegin, duplicatePackingError, duplicatePackingSuccess} from '../actions/duplicatePacking';


export default function createDuplicatePacking(body) {
  const url = appConfig.API_URL + '/api/add-duplicate-signed-form';
  const parameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body),
  };

  return dispatch => {
    dispatch(duplicatePackingBegin());

    fetch(url, parameters)
        .then(res => res.json())
        .then(response => {
          const {data} = response;

          if (!data) {
            dispatch(duplicatePackingError(response));
            return;
          }

          dispatch(duplicatePackingSuccess(data));
        })
        .catch(error => dispatch(duplicatePackingError(error)));
  };
}
