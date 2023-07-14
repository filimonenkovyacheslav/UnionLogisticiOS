import {
  ADD_RECEIPT_BEGIN,
  ADD_RECEIPT_CLEAR,
  ADD_RECEIPT_ERROR,
  ADD_RECEIPT_SUCCESS,
} from '../actions/addReceipt';

const initialState = {
  message: null,
  loading: false,
  error: null
};

export function addReceiptReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RECEIPT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_RECEIPT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };

    case ADD_RECEIPT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case ADD_RECEIPT_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
        message: null
      };

    default:
      return state;
  }
}
