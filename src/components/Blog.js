import { useState } from 'react';

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showDetails = () => (
    <div className='details'>
      <p>Id: { blog.id } </p>
      <p>Likes: { blog.likes } </p>
      <p>Url: { blog.url } </p>
      <p>Author: { blog.author } </p>
      <button onClick={toggleVisibility}>hide</button>
    </div>
  );

  return(
    <div>
      { blog.title} by {blog.author} <button onClick={toggleVisibility}>view</button>
      { visible === true && showDetails() }
    </div>
  );
};

export default Blog;