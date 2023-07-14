export const ADD_RECEIPT_BEGIN = 'ADD_RECEIPT_BEGIN';
export const ADD_RECEIPT_SUCCESS = 'ADD_RECEIPT_SUCCESS';
export const ADD_RECEIPT_ERROR = 'ADD_RECEIPT_ERROR';
export const ADD_RECEIPT_CLEAR = 'ADD_RECEIPT_CLEAR';

export function addReceiptBegin() {
  return {
    type: ADD_RECEIPT_BEGIN,
  };
}

export function addReceiptSuccess(data) {
  return {
    type: ADD_RECEIPT_SUCCESS,
    payload: {
      message: data
    },
  };
}

export function addReceiptError(error) {
  return {
    type: ADD_RECEIPT_ERROR,
    payload: {
      error,
    },
  };
}

export function addReceiptClear() {
  return {
    type: ADD_RECEIPT_CLEAR,
  };
}
