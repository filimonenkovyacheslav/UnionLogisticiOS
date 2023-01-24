import {
  SIGN_IN_BEGIN,
  SIGN_IN_CLEAR,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
} from '../actions/user';

const authInitialState = {
  token: null,
  loading: false,
  error: null,
  userName: null,
  userRole: null
};

export function signInReducer(state = authInitialState, action) {
  switch (action.type) {
    case SIGN_IN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        userName: action.payload.userName,
        userRole: action.payload.userRole
      };

    case SIGN_IN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case SIGN_IN_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
        token: null,
        userName: null,
        userRole: null
      };

    default:
      return state;
  }
}
