import {addReceiptBegin, addReceiptError, addReceiptSuccess} from '../actions/addReceipt';


export default function addReceipt(body) {
  const url = body.senderSite + '/api/add-new-receipt';
  const parameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body),
  };
console.log(url)
  return dispatch => {
    dispatch(addReceiptBegin());

    fetch(url, parameters)
        .then(res => res.json())
        .then(response => {
          const {success, message} = response;

          if (!success) {
            dispatch(addReceiptError(response));
            return;
          }

          dispatch(addReceiptSuccess(message));
        })
        .catch(error => dispatch(addReceiptError(error)));
  };
}
