import {
  ADD_LIST_BEGIN,
  ADD_LIST_CLEAR,
  ADD_LIST_ERROR,
  ADD_LIST_SUCCESS,
} from '../actions/addList';

const initialState = {
  message: null,
  loading: false,
  error: null
};

export function addListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LIST_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };

    case ADD_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case ADD_LIST_CLEAR:
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
