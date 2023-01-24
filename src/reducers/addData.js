import {
  ADD_DATA_BEGIN,
  ADD_DATA_CLEAR,
  ADD_DATA_ERROR,
  ADD_DATA_SUCCESS,
} from '../actions/addData';

const initialState = {
  message: null,
  loading: false,
  error: null
};

export function addDataReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };

    case ADD_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case ADD_DATA_CLEAR:
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
