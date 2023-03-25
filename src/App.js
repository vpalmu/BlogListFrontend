import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Toggleable';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
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

  const handleLogout = async (event) => {
    event.preventDefault();
    console.log('logging out with', username, password);
    setUser(null);
    localStorage.removeUser();
  };

  const blogList = () => (
    <div>
      <ul>
        { blogs.map(blog =>
          <li key={blog.id}><Blog blog={blog} /></li>
        )}
      </ul>
    </div>
  );

  const loginForm = () => (
    <Togglable toggleOnButtonLabel='Log in' toggleOffButtonLabel='Cancel'>
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUserNameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUserChange={setUser}
          setMessageCallback={setErrorMessage}
        />
      </div>
    </Togglable>
  );

  const logoutForm = () => (
    <div>
      <p>{user.name} logged in</p>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
    </div>
  );

  return (
    <div>
      <h2>Blog list app</h2>
      { errorMessage && <Notification message={errorMessage} isErrorMessage={true} /> }
      { user === null && loginForm() }
      { user && logoutForm() }

      { user !== null &&
        <Togglable toggleOnButtonLabel='new blog' toggleOffButtonLabel='cancel'>
          <BlogForm setMessageCallback={setErrorMessage}/>
        </Togglable>
      }
      <h2>Blogs</h2>
      { blogList() }
    </div>
  );
};

export default App;