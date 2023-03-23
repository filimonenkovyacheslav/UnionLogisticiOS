import {
  FETCH_CHECKLIST_BEGIN,
  FETCH_CHECKLIST_CLEAR,
  FETCH_CHECKLIST_ERROR,
  FETCH_CHECKLIST_SUCCESS,
} from '../actions/checklist';

const initialState = {
  checklist: [],
  loading: false,
  error: null,
};

export function fetchChecklistReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHECKLIST_BEGIN:
      // Mark state as loading.
      // Reset any errors, starting new request.
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CHECKLIST_SUCCESS:
      // Checklist fetched, sets loading to false.
      // Replace checklist in state.
      return {
        ...state,
        loading: false,
        checklist: action.checklist,
      };
    case FETCH_CHECKLIST_ERROR:
      // Request failed, sets loading to false, saves error to state.
      // Resets task too.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        checklist: [],
      };
    case FETCH_CHECKLIST_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
