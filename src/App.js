import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Toggleable';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import localStorage from './services/localStorage';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setTitle] = useState([]);
  const [newBlogAuthor, setAuthor] = useState([]);
  const [newBlogUrl, setUrl] = useState([]);
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

  const handleAddNewBlog = async (event) => {
    event.preventDefault();
    console.log('adding new blog');

    const blogToCreate = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    };

    try {
      await blogService.addNewBlog(blogToCreate);

      setTitle('');
      setAuthor('');
      setUrl('');
      setErrorMessage(`A new blog ${blogToCreate.title} by ${blogToCreate.author} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    } catch (error) {
      setErrorMessage('Adding new blog failed..');
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
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
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
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
      <ul>
        { blogs.map(blog =>
          <li><Blog key={blog.id} blog={blog} /></li>
        )}
      </ul>
    </div>
  );

  const addNewBlog = () => (
    <Togglable toggleOnButtonLabel='new blog' toggleOffButtonLabel='cancel'>
      <BlogForm
        onSubmit={handleAddNewBlog}
        blogTitle={newBlogTitle}
        handleBlogTitleChange={(target) => { setAuthor(target.value);}}
        blogAuthor={newBlogAuthor}
        handleBlogAuthorChange={(target) => { setAuthor(target.value);}}
        blogUrl={newBlogUrl}
        handleBlogUrlChange={(target) => { setUrl(target.value);}}
      />
    </Togglable>
  );

  const loginForm = () => (
    <Togglable toggleOnButtonLabel='Log in' toggleOffButtonLabel='Cancel'>
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
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

      <h2>Blogs</h2>
      { user !== null && addNewBlog() }
      { blogList() }
    </div>
  );
};

export default App;