import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import localStorage from './services/localStorage';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  // get all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  // check for logged in user
  useEffect(() => {
    const user = localStorage.getUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username, password,
      });

      localStorage.setUser(user);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    console.log('logging out with', username, password);
    setUser(null);
    localStorage.removeUser();
  };

  const blogList = () => (
    <div>
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  );

  return (
    <div>
      { errorMessage && <Notification message={errorMessage} isErrorMessage={true} /> }
      { user === null && loginForm() }
      { user !== null && logoutForm() }
      { user && <div>
        <p>{user.name} logged in</p>
      </div>
      }

      <h2>Blogs</h2>

      { user !== null && blogList() }
    </div>
  );
};

export default App;