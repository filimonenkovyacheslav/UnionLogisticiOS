import {fetchChecklistBegin, fetchChecklistError, fetchChecklistSuccess} from '../actions/checklist';


export default function fetchChecklist(userData) {
  const url = userData.serverName + '/api/get-checklist?';
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
    dispatch(fetchChecklistBegin());

    fetch(url+params, parameters)
        .then(res => res.json())
        .then(response => {

          const {success, data, message} = response;

          if (!success) {
            dispatch(fetchChecklistError(message));
            return;
          }

          dispatch(fetchChecklistSuccess(data));
        })
        .catch(error => dispatch(fetchChecklistError(error)));
  };
}
