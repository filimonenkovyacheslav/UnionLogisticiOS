export const ADD_CHECKS_HISTORY_BEGIN = 'ADD_CHECKS_HISTORY_BEGIN';
export const ADD_CHECKS_HISTORY_SUCCESS = 'ADD_CHECKS_HISTORY_SUCCESS';
export const ADD_CHECKS_HISTORY_ERROR = 'ADD_CHECKS_HISTORY_ERROR';
export const ADD_CHECKS_HISTORY_CLEAR = 'ADD_CHECKS_HISTORY_CLEAR';

export function addChecksHistoryBegin() {
  return {
    type: ADD_CHECKS_HISTORY_BEGIN,
  };
}

export function addChecksHistorySuccess(data) {
  return {
    type: ADD_CHECKS_HISTORY_SUCCESS,
    payload: {
      message: data
    },
  };
}

export function addChecksHistoryError(error) {
  return {
    type: ADD_CHECKS_HISTORY_ERROR,
    payload: {
      error,
    },
  };
}

export function addChecksHistoryClear() {
  return {
    type: ADD_CHECKS_HISTORY_CLEAR,
  };
}
