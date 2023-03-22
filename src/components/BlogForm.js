const BlogForm = ({
  onSubmit,
  handleBlogTitleChange,
  blogTitle,
  handleBlogAuthorChange,
  blogAuthor,
  handleBlogUrlChange,
  blogUrl
}) => {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          Title
          <input
            type="text"
            value={blogTitle}
            name="BlogTitle"
            onChange={handleBlogTitleChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={blogAuthor}
            name="BlogAuthor"
            onChange={handleBlogAuthorChange}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={blogUrl}
            name="BlogUrl"
            onChange={handleBlogUrlChange}
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