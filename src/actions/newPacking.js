export const NEW_PACKING_BEGIN = 'NEW_PACKING_BEGIN';
export const NEW_PACKING_SUCCESS = 'NEW_PACKING_SUCCESS';
export const NEW_PACKING_ERROR = 'NEW_PACKING_ERROR';
export const NEW_PACKING_CLEAR = 'NEW_PACKING_CLEAR';

export function newPackingBegin() {
  return {
    type: NEW_PACKING_BEGIN,
  };
}

export function newPackingSuccess(data) {
  return {
    type: NEW_PACKING_SUCCESS,
    payload: {
      link: data.link
    },
  };
}

export function newPackingError(error) {
  return {
    type: NEW_PACKING_ERROR,
    payload: {
      error,
    },
  };
}

export function newPackingClear() {
  return {
    type: NEW_PACKING_CLEAR,
  };
}
