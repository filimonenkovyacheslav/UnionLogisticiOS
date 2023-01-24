import {
  NEW_PACKING_BEGIN,
  NEW_PACKING_CLEAR,
  NEW_PACKING_ERROR,
  NEW_PACKING_SUCCESS,
} from '../actions/newPacking';

const initialState = {
  link: null,
  loading: false,
  error: null
};

export function newPackingReducer(state = initialState, action) {
  switch (action.type) {
    case NEW_PACKING_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case NEW_PACKING_SUCCESS:
      return {
        ...state,
        loading: false,
        link: action.payload.link
      };

    case NEW_PACKING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case NEW_PACKING_CLEAR:
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
