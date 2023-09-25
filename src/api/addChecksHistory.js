import {addChecksHistoryBegin, addChecksHistoryError, addChecksHistorySuccess} from '../actions/addChecksHistory';


export default function addChecksHistory(body) {
  const url = body.serverName + '/api/add-checks-history';
  const parameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body),
  };

  return dispatch => {
    dispatch(addChecksHistoryBegin());

    fetch(url, parameters)
        .then(res => res.json())
        .then(response => {
          const {success, message} = response;

          if (!success) {
            dispatch(addChecksHistoryError(response));
            return;
          }

          dispatch(addChecksHistorySuccess(message));
        })
        .catch(error => dispatch(addChecksHistoryError(error)));
  };
}
