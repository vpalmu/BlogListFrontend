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


  const deleteButtonClickHandler = async (blog) => {
    console.log(`deleting blog with id: ${blog.id}`);

    try {
      blogService.deleteBlog(blog);
      console.log('blog deleted !');
      window.location.reload(); // refresh the page
    } catch (exception) {
      console.log(exception);
    }
  };

  const likeButtonHandler = async (blog) => {
    console.log(`adding one like to blog: ${blog.title}`);

    try {
      blog.likes += 1;
      blogService.updateBlog(blog);
      window.location.reload(); // refresh the page
    } catch (exception) {
      console.log(exception);
    }
  };

  const showDetails = () => (
    <div className='details'>
      <p>Id: { blog.id } </p>
      <p>Likes: { blog.likes }  <button onClick={() => likeButtonHandler(blog)}>Like</button></p>
      <p>Url: { blog.url } </p>
      <p>Author: { blog.author }</p>
      { blog.user && <p>Added by: { blog.user.name }</p> }
      { canDeleteBlog && <button onClick={() => deleteButtonClickHandler(blog)}>Delete</button> }
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