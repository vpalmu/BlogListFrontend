import { useState } from 'react';
import blogService from '../services/blogs';
import localStorage from '../services/localStorage';

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  function CheckUserPermission() {
    if (blog.user === undefined) return null;
    if (blog.user === null) return null;
    if (user.username !== blog.user.username) return null;

    return true; // has permission
  }

  const user = localStorage.getUser();
  const canDeleteBlog = CheckUserPermission();


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
      { canDeleteBlog && <button onClick={() => deleteButtonClickHandler(blog.id)}>Delete</button> }
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