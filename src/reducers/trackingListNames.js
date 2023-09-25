import {
  FETCH_TRACKINGLISTNAMES_BEGIN,
  FETCH_TRACKINGLISTNAMES_CLEAR,
  FETCH_TRACKINGLISTNAMES_ERROR,
  FETCH_TRACKINGLISTNAMES_SUCCESS,
} from '../actions/trackingListNames';

const initialState = {
  trackingListNames: [],
  loading: false,
  error: null,
};

export function fetchTrackingListNamesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRACKINGLISTNAMES_BEGIN:
      // Mark state as loading.
      // Reset any errors, starting new request.
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TRACKINGLISTNAMES_SUCCESS:
      // Tracking List Names fetched, sets loading to false.
      // Replace Tracking List Names in state.
      return {
        ...state,
        loading: false,
        trackingListNames: action.trackingListNames,
      };
    case FETCH_TRACKINGLISTNAMES_ERROR:
      // Request failed, sets loading to false, saves error to state.
      // Resets Tracking List Names too.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        trackingListNames: [],
      };
    case FETCH_TRACKINGLISTNAMES_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
