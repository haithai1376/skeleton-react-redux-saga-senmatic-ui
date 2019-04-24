import fakeRequest from '../../auth/fakeRequest';
const LOGIN_API_LOGIN_URL: string = '/login';
class LoginAPI {

  localStorage = global.window.localStorage

  /**
   * Logs a user in, returning a promise with `true` when done
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  login(username, password) {
    if (this.loggedIn()) return Promise.resolve(true)

    // Post a fake request
    return fakeRequest.post(LOGIN_API_LOGIN_URL, {
        username,
        password
      })
      .then(response => {
        // Save token to local storage
        localStorage.token = response.token
        return Promise.resolve(true)
      })
  }

  loggedIn() {
    return !!localStorage.token
  }
}

export default LoginAPI;
