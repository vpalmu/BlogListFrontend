import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const deleteBlog = blog => {
  const config = {
    headers: { Authorization: token },
  };

  const resourceUrl = `${baseUrl}/${blog.id}`;
  console.log('resourceUrl:', resourceUrl);
  const request = axios.delete(resourceUrl, config);
  return request.then(response => response.data);
};

const addNewBlog = newBlog => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, newBlog, config);
  return request.then(response => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addNewBlog, setToken, deleteBlog };