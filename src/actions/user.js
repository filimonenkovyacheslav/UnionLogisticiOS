export const SIGN_IN_BEGIN = 'SIGN_IN_BEGIN';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_IN_CLEAR = 'SIGN_IN_CLEAR';

export function signInBegin() {
  return {
    type: SIGN_IN_BEGIN,
  };
}

export function signInSuccess(data) {
  const name = data.email.split("@")[0]
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      token: data.api_token,
      userName: name,
      userRole: data.role
    },
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: {
      error,
    },
  };
}

export function signInClear() {
  return {
    type: SIGN_IN_CLEAR,
  };
}
