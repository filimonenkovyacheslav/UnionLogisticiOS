export const FETCH_CHECKLIST_BEGIN = 'FETCH_CHECKLIST_BEGIN';
export const FETCH_CHECKLIST_SUCCESS = 'FETCH_CHECKLIST_SUCCESS';
export const FETCH_CHECKLIST_ERROR = 'FETCH_CHECKLIST_ERROR';
export const FETCH_CHECKLIST_CLEAR = 'FETCH_CHECKLIST_CLEAR';

export function fetchChecklistBegin() {
  return {
    type: FETCH_CHECKLIST_BEGIN,
  };
}

export function fetchChecklistSuccess(checklist) {
  return {
    type: FETCH_CHECKLIST_SUCCESS,
    checklist
  };
}

export function fetchChecklistError(error) {
  return {
    type: FETCH_CHECKLIST_ERROR,
    payload: {
      error: error,
    },
  };
}

export function fetchChecklistClear() {
  return {
    type: FETCH_CHECKLIST_CLEAR,
  };
}
