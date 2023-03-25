import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ setMessageCallback }) => {
  const [blogTitle, setTitle] = useState([]);
  const [blogAuthor, setAuthor] = useState([]);
  const [blogUrl, setUrl] = useState([]);

  const showMessage = (message) => {
    setMessageCallback(message);
  };

  const handleAddNewBlog = async (event) => {
    event.preventDefault();
    console.log('adding new blog');

    const blogToCreate = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0
    };

    try {
      await blogService.addNewBlog(blogToCreate);

      setTitle('');
      setAuthor('');
      setUrl('');
      showMessage(`A new blog ${blogToCreate.title} by ${blogToCreate.author} added`);
      setTimeout(() => {
        showMessage(null);
      }, 2000);
    } catch (error) {
      showMessage('Adding new blog failed..');
      setTimeout(() => {
        showMessage(null);
      }, 2000);
    }
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleAddNewBlog}>
        <div>
          Title
          <input
            type="text"
            value={blogTitle}
            name="BlogTitle"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={blogAuthor}
            name="BlogAuthor"
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={blogUrl}
            name="BlogUrl"
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
        <br></br>
        <br></br>
      </form>
    </div>
  );
};

export default BlogForm;