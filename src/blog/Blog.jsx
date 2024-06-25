import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


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
  const [message, setMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const API_URL = "";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(API_URL);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const addBlog = async () => {
    try {
      await axios.post(API_URL, newBlog);
      setBlogs([...blogs, newBlog]);
      setNewBlog({
        BlogID: '',
        Title: '',
        Content: '',
        DateCreated: '',
        UserID: ''
      });
      setMessage('Blog added successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const deleteBlog = async (blogId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${blogId}`);
        setBlogs(blogs.filter(blog => blog.BlogID !== blogId));
        setMessage('Blog deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const updateBlog = async () => {
    try {
      await axios.put(`${API_URL}/${newBlog.BlogID}`, newBlog);
      setBlogs(blogs.map(blog => (blog.BlogID === editBlog.BlogID ? editBlog : blog)));
      setEditBlog(null);
      setMessage('Blog updateed successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editBlog) {
      setNewBlog({ ...editBlog, [name]: value });
    } else {
      setNewBlog({ ...newBlog, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editBlog) {
      updateBlog();
    } else {
      addBlog();
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-4xl font-bold text-center mb-5">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label className="mb-2">Title:</label>
          <input
            type="text"
            name="Title"
            value={newBlog.Title}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Content:</label>
          <textarea
            name="Content"
            value={newBlog.Content}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Date Created:</label>
          <input
            type="date"
            name="DateCreated"
            value={newBlog.DateCreated}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">User ID:</label>
          <input
            type="text"
            name="UserID"
            value={newBlog.UserID}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">Add Blog</button>
      </form>
      <h2 className="text-2xl font-bold text-center mt-10 mb-5">Blog List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Content</th>
            <th className="border p-2">Date Created</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through materials and render each material */}
          {blogs.map(blog => (
            <tr key={blog.BlogID} className="bg-gray-100">
              <td className="border p-2">{blog.Title}</td>
              <td className="border p-2">{blog.Content}</td>
              <td className="border p-2">{blog.DateCreated}</td>
              <td className="border p-2">{blog.UserID}</td>
              <td className="border p-2">
                <button onClick={() => setEditBlog(blog)} className="px-2 py-1 bg-green-500 text-white rounded mr-2">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => deleteBlog(blog.BlogID)} className="px-2 py-1 bg-red-500 text-white rounded">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
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
