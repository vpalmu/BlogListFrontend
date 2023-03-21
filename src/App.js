import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
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
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );

  const addNewBlog = () => (
    <form onSubmit={handleAddNewBlog}>
      <div>Create new</div>
      <div>
        Title
        <input
          type="text"
          value={newBlogTitle}
          name="BlogTitle"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={newBlogAuthor}
          name="BlogAuthor"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url
        <input
          type="text"
          value={newBlogUrl}
          name="BlogUrl"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">add</button>
      <br></br>
      <br></br>
    </form>
  );

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div
        login to application
      ></div>
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
      { user !== null && addNewBlog() }
      { user !== null && blogList() }
    </div>
  );
};

export default App;