export const ADD_LIST_BEGIN = 'ADD_LIST_BEGIN';
export const ADD_LIST_SUCCESS = 'ADD_LIST_SUCCESS';
export const ADD_LIST_ERROR = 'ADD_LIST_ERROR';
export const ADD_LIST_CLEAR = 'ADD_LIST_CLEAR';

export function addListBegin() {
  return {
    type: ADD_LIST_BEGIN,
  };
}

export function addListSuccess(data) {
  return {
    type: ADD_LIST_SUCCESS,
    payload: {
      message: data
    },
  };
}

export function addListError(error) {
  return {
    type: ADD_LIST_ERROR,
    payload: {
      error,
    },
  };
}

export function addListClear() {
  return {
    type: ADD_LIST_CLEAR,
  };
}
