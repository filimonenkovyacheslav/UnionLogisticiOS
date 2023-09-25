import {fetchTrackingListNamesBegin, fetchTrackingListNamesError, fetchTrackingListNamesSuccess} from '../actions/trackingListNames';


export default function fetchTrackingListNames(userData) {
  const url = userData.serverName + '/api/get-tracking-list-names?';
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
    dispatch(fetchTrackingListNamesBegin());

    fetch(url+params, parameters)
        .then(res => res.json())
        .then(response => {

          const {success, data, message} = response;

          if (!success) {
            dispatch(fetchTrackingListNamesError(message));
            return;
          }

          dispatch(fetchTrackingListNamesSuccess(data));
        })
        .catch(error => dispatch(fetchTrackingListNamesError(error)));
  };
}
