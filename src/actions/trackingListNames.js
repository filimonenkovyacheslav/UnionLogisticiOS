export const FETCH_TRACKINGLISTNAMES_BEGIN = 'FETCH_TRACKINGLISTNAMES_BEGIN';
export const FETCH_TRACKINGLISTNAMES_SUCCESS = 'FETCH_TRACKINGLISTNAMES_SUCCESS';
export const FETCH_TRACKINGLISTNAMES_ERROR = 'FETCH_TRACKINGLISTNAMES_ERROR';
export const FETCH_TRACKINGLISTNAMES_CLEAR = 'FETCH_TRACKINGLISTNAMES_CLEAR';

export function fetchTrackingListNamesBegin() {
  return {
    type: FETCH_TRACKINGLISTNAMES_BEGIN,
  };
}

export function fetchTrackingListNamesSuccess(trackingListNames) {
  return {
    type: FETCH_TRACKINGLISTNAMES_SUCCESS,
    trackingListNames
  };
}

export function fetchTrackingListNamesError(error) {
  return {
    type: FETCH_TRACKINGLISTNAMES_ERROR,
    payload: {
      error: error,
    },
  };
}

export function fetchTrackingListNamesClear() {
  return {
    type: FETCH_TRACKINGLISTNAMES_CLEAR,
  };
}
