import {
  DUPLICATE_PACKING_BEGIN,
  DUPLICATE_PACKING_CLEAR,
  DUPLICATE_PACKING_ERROR,
  DUPLICATE_PACKING_SUCCESS,
} from '../actions/duplicatePacking';

const initialState = {
  link: null,
  loading: false,
  error: null
};

export function duplicatePackingReducer(state = initialState, action) {
  switch (action.type) {
    case DUPLICATE_PACKING_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DUPLICATE_PACKING_SUCCESS:
      return {
        ...state,
        loading: false,
        link: action.payload.link
      };

    case DUPLICATE_PACKING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case DUPLICATE_PACKING_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
        link: null
      };

    default:
      return state;
  }
}
