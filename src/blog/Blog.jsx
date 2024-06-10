import { useState, useEffect } from 'react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    BlogID: '',
    Title: '',
    Content: '',
    DateCreated: '',
    UserID: ''
  });
  const [editBlog, setEditBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      // Fetch blogs data from API
      // const response = await fetch('API_ENDPOINT/blogs');
      // const data = await response.json();
      // setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const addBlog = async () => {
    try {
      // Perform validation on newBlog data

      // Send POST request to API to add new blog
      // await fetch('API_ENDPOINT/blogs', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(newBlog)
      // });

      // Update local state with new blog
      // setBlogs([...blogs, newBlog]);

      // Clear newBlog state
      // setNewBlog({ BlogID: '', Title: '', Content: '', DateCreated: '', UserID: '' });
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      // Send DELETE request to API to delete blog
      // await fetch(`API_ENDPOINT/blogs/${blogId}`, {
      //   method: 'DELETE'
      // });

      // Update local state by removing the deleted blog
      // setBlogs(blogs.filter(blog => blog.BlogID !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const updateBlog = async () => {
    try {
      // Perform validation on editBlog data

      // Send PUT request to API to update blog
      // await fetch(`API_ENDPOINT/blogs/${editBlog.BlogID}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(editBlog)
      // });

      // Update local state with edited blog
      // setBlogs(blogs.map(blog => {
      //   if (blog.BlogID === editBlog.BlogID) {
      //     return editBlog;
      //   }
      //   return blog;
      // }));

      // Clear editBlog state
      // setEditBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog();
  };

  return (
    <div style={styles.container}>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label>Title:</label>
          <input
            type="text"
            name="Title"
            value={newBlog.Title}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Content:</label>
          <textarea
            name="Content"
            value={newBlog.Content}
            onChange={handleInputChange}
            style={styles.textarea}
          ></textarea>
        </div>
        <div style={styles.formGroup}>
          <label>Date Created:</label>
          <input
            type="date"
            name="DateCreated"
            value={newBlog.DateCreated}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>User ID:</label>
          <input
            type="text"
            name="UserID"
            value={newBlog.UserID}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Add Blog</button>
      </form>
      <h2>Blog List</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableRow}>
            <th>BlogID</th>
            <th>Title</th>
            <th>Content</th>
            <th>DateCreated</th>
            <th>UserID</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through materials and render each material */}
          {blogs.map(blog => (
            <tr key={blog.BlogID}>
              <td>{blog.Title}</td>
              <td>{blog.Content}</td>
              <td>{blog.DateCreated}</td>
              <td>{blog.UserID}</td>
              <td>
                <button onClick={() => setEditBlog(blog)} style={styles.actionButton}>Edit</button>
                <button onClick={() => deleteBlog(blog.BlogID)} style={styles.actionButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px'
  },
  heading: {
    textAlign: 'center'
  },
  formGroup: {
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    minHeight: '100px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  listItem: {
    marginBottom: '10px'
  },
  actionButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#dc3545',
    color: 'white'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  },
  tableRow: {
    backgroundColor: '#f2f2f2'
  }
};

export default Blog;
