import { LOGIN_EXECUTE_REQUEST, LOGIN_REQUEST_STATUS, SET_AUTH, LOGIN_REQUEST_SUCCESS } from "./login.constants";

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
export function loginRequestSatus (sending) {
  return {type: LOGIN_REQUEST_STATUS, sending}
}

/**
 * Tells the app we want to log in a user
 * @param  {object} data          The data we're sending for log in
 * @param  {string} data.username The username of the user to log in
 * @param  {string} data.password The password of the user to log in
 */
export const loginRequest = (data) => ({
  type: LOGIN_EXECUTE_REQUEST,
  payload: { data }
});

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export function setAuthState (newAuthState) {
  return {type: SET_AUTH, newAuthState}
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function loginRequestError (error) {
  return {type: LOGIN_REQUEST_ERROR, error}
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function loginRequestSuccess () {
  return {type: LOGIN_REQUEST_SUCCESS}
}

/**
 * Sets the `error` state as empty
 */
export function loginClearError () {
  return {type: LOGIN_CLEAR_ERROR}
}
