import {
  FETCH_TASKS_BEGIN,
  FETCH_TASKS_CLEAR,
  FETCH_TASKS_ERROR,
  FETCH_TASKS_SUCCESS,
} from '../actions/tasks';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export function fetchTasksReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS_BEGIN:
      // Mark state as loading.
      // Reset any errors, starting new request.
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TASKS_SUCCESS:
      // Tasks fetched, sets loading to false.
      // Replace tasks in state.
      return {
        ...state,
        loading: false,
        tasks: action.tasks,
      };
    case FETCH_TASKS_ERROR:
      // Request failed, sets loading to false, saves error to state.
      // Resets task too.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        tasks: [],
      };
    case FETCH_TASKS_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
