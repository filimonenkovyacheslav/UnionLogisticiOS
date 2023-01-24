export const DUPLICATE_PACKING_BEGIN = 'DUPLICATE_PACKING_BEGIN';
export const DUPLICATE_PACKING_SUCCESS = 'DUPLICATE_PACKING_SUCCESS';
export const DUPLICATE_PACKING_ERROR = 'DUPLICATE_PACKING_ERROR';
export const DUPLICATE_PACKING_CLEAR = 'DUPLICATE_PACKING_CLEAR';

export function duplicatePackingBegin() {
  return {
    type: DUPLICATE_PACKING_BEGIN,
  };
}

export function duplicatePackingSuccess(data) {
  return {
    type: DUPLICATE_PACKING_SUCCESS,
    payload: {
      link: data.link
    },
  };
}

export function duplicatePackingError(error) {
  return {
    type: DUPLICATE_PACKING_ERROR,
    payload: {
      error,
    },
  };
}

export function duplicatePackingClear() {
  return {
    type: DUPLICATE_PACKING_CLEAR,
  };
}
