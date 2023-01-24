export const FETCH_TASKS_BEGIN = 'FETCH_TASKS_BEGIN';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const FETCH_TASKS_CLEAR = 'FETCH_TASKS_CLEAR';

export function fetchTasksBegin() {
  return {
    type: FETCH_TASKS_BEGIN,
  };
}

export function fetchTasksSuccess(tasks) {
  return {
    type: FETCH_TASKS_SUCCESS,
    tasks
  };
}

export function fetchTasksError(error) {
  return {
    type: FETCH_TASKS_ERROR,
    payload: {
      error: error,
    },
  };
}

export function fetchTasksClear() {
  return {
    type: FETCH_TASKS_CLEAR,
  };
}
