export const UPDATE_TASK_BEGIN = 'UPDATE_TASK_BEGIN';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';
export const UPDATE_TASK_CLEAR = 'UPDATE_TASK_CLEAR';

export function updateTaskBegin() {
  return {
    type: UPDATE_TASK_BEGIN,
  };
}

export function updateTaskSuccess() {
  return {
    type: UPDATE_TASK_SUCCESS,
  };
}

export function updateTaskError(error) {
  return {
    type: UPDATE_TASK_ERROR,
    payload: {
      error: error,
    },
  };
}

export function updateTaskClear() {
  return {
    type: UPDATE_TASK_CLEAR,
  };
}
