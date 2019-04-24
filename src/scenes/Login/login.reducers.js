import { SET_AUTH, LOGIN_REQUEST_STATUS, LOGIN_REQUEST_ERROR, LOGIN_CLEAR_ERROR, LOGIN_REQUEST_SUCCESS } from "./login.constants";

/*
 * The reducer takes care of state changes in our app through actions
 */

// The initial application state
let defaultState = {
  formState: {
    username: '',
    password: ''
  },
  error: '',
  currentlyStatus: false, // false: request was processed | ture: request is processing.
  loggedIn: false // User logined in = true otherwise false.
}

function loginReducer(state = defaultState, action) {
  const { type, payload } = action;
  console.log('login reducer: ', state, action)
  switch (type) {
    case SET_AUTH:
      return { ...state, loggedIn: action.newAuthState };
    case LOGIN_REQUEST_STATUS:
      return { ...state, currentlyStatus: action.status };
    case LOGIN_REQUEST_SUCCESS:
    return { ...state, currentlyStatus: false, formState: action.formState };
    case LOGIN_REQUEST_ERROR:
      return { ...state, error: action.error };
    case LOGIN_CLEAR_ERROR:
      return { ...state, error: ''};
    default:
      return state;
  }
}

export default loginReducer