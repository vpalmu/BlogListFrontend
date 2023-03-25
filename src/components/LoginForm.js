import loginService from '../services/login';
import blogService from '../services/blogs';
import localStorage from '../services/localStorage';

const LoginForm = ({
  handleUserNameChange,
  handlePasswordChange,
  handleUserChange,
  setMessageCallback,
  username,
  password
}) => {

  const showMessage = (message) => {
    setMessageCallback(message);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username, password,
      });

      localStorage.setUser(user);
      blogService.setToken(user.token); // save token for service to use
      handleUserChange(user);
    } catch (exception) {
      showMessage('Wrong credentials');
      setTimeout(() => {
        showMessage(null);
      }, 2000);
    }
  };

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUserNameChange}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;