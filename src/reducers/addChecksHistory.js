import {
  ADD_CHECKS_HISTORY_BEGIN,
  ADD_CHECKS_HISTORY_CLEAR,
  ADD_CHECKS_HISTORY_ERROR,
  ADD_CHECKS_HISTORY_SUCCESS,
} from '../actions/addChecksHistory';

const initialState = {
  message: null,
  loading: false,
  error: null
};

export function addChecksHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CHECKS_HISTORY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_CHECKS_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };

    case ADD_CHECKS_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case ADD_CHECKS_HISTORY_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
        message: null
      };

    default:
      return state;
  }
}
