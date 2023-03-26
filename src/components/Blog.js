import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const deleteButtonClickHandler = async (blogId) => {
    console.log(`deleting blog with id: ${blogId}`);

    try {
      blogService.deleteBlog(blogId);
      console.log('blog deleted !');
      window.location.reload(); // refresh the page
    } catch (exception) {
      console.log(exception);
    }
  };

  const showDetails = () => (
    <div className='details'>
      <p>Id: { blog.id } </p>
      <p>Likes: { blog.likes } </p>
      <p>Url: { blog.url } </p>
      <p>Author: { blog.author } </p>
      { blog.user && <p>Added by: { blog.user.name }</p> }
      <button onClick={() => deleteButtonClickHandler(blog.id)}>Delete</button>
      <button onClick={toggleVisibility}>Close</button>
    </div>
  );

  return(
    <div>
      { blog.title} by {blog.author} <button onClick={toggleVisibility}>View</button>
      { visible === true && showDetails() }
    </div>
  );
};

export default Blog;