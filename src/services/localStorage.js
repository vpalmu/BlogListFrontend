const LOGGED_IN_USER_KEY = 'loggedInBlogsAppUser';

const setUser = (user) => {
  window.localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
};

const getUser = () => {
  const loggedInUserJSON = window.localStorage.getItem(LOGGED_IN_USER_KEY);

  if (loggedInUserJSON) {
    return JSON.parse(loggedInUserJSON);
  }
  return null;
};

const removeUser = () => {
  window.localStorage.removeItem(LOGGED_IN_USER_KEY);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getUser, setUser, removeUser };