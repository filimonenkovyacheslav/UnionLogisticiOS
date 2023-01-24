import {
  UPDATE_TASK_BEGIN,
  UPDATE_TASK_CLEAR,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS,
} from '../actions/task';

const initialState = {
  loading: false,
  error: null,
};

export function updateTaskReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TASK_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_TASK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_TASK_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
