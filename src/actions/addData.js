export const ADD_DATA_BEGIN = 'ADD_DATA_BEGIN';
export const ADD_DATA_SUCCESS = 'ADD_DATA_SUCCESS';
export const ADD_DATA_ERROR = 'ADD_DATA_ERROR';
export const ADD_DATA_CLEAR = 'ADD_DATA_CLEAR';

export function addDataBegin() {
  return {
    type: ADD_DATA_BEGIN,
  };
}

export function addDataSuccess(data) {
  return {
    type: ADD_DATA_SUCCESS,
    payload: {
      message: data
    },
  };
}

export function addDataError(error) {
  return {
    type: ADD_DATA_ERROR,
    payload: {
      error,
    },
  };
}

export function addDataClear() {
  return {
    type: ADD_DATA_CLEAR,
  };
}
