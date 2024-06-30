import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    BlogID: '',
    Title: '',
    Description: '',
    DateCreated: '',
    UserID: ''
  });
  const [editBlog, setEditBlog] = useState(null);
  const [message, setMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const editorRef = useRef(null);
  const API_URL = "https://667a627cbd627f0dcc8ea52b.mockapi.io/Blog";  // Replace with your actual API URL

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        setBlogs(response.data);
      } else {
        console.error('Fetched data is not an array:', response.data);
        setBlogs([]);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    }
  };

  const addBlog = async () => {
    try {
      await axios.post(API_URL, newBlog);
      setBlogs([...blogs, newBlog]);
      setNewBlog({
        BlogID: '',
        Title: '',
        Description: '',
        DateCreated: '',
        UserID: ''
      });
      editorRef.current.resetContent();
      setMessage('Blog added successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const deleteBlog = async (BlogID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${BlogID}`);
        setBlogs(blogs.filter(blog => blog.BlogID !== BlogID));
        setMessage('Blog deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const updateBlog = async () => {
    try {
      await axios.put(`${API_URL}/${editBlog.BlogID}`, editBlog);
      setBlogs(blogs.map(blog => (blog.BlogID === editBlog.BlogID ? editBlog : blog)));
      setEditBlog(null);
      editorRef.current.resetContent();
      setMessage('Blog updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editBlog) {
      setEditBlog({ ...editBlog, [name]: value });
    } else {
      setNewBlog({ ...newBlog, [name]: value });
    }
  };

  const handleEditorChange = (content, editor) => {
    if (editBlog) {
      setEditBlog({ ...editBlog, Description: content });
    } else {
      setNewBlog({ ...newBlog, Description: content });
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

  const handleEditClick = (blog) => {
    editorRef.current.setContent(blog.Description);
    setEditBlog(blog);
    setIsFormVisible(true);

  };

  return (
    <div className="font-sans p-5">
      <h1 className="text-4xl font-bold text-black-500 mb-5 flex justify-center">Add New Blog</h1>
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="px-5 py-2 mb-5 text-lg text-white bg-blue-500 rounded"
      >
        {isFormVisible ? 'Hide Form' : 'Add Blog'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className="mb-4">
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              name="Title"
              value={editBlog ? editBlog.Title : newBlog.Title}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Description" className="block">Description</label>
            <Editor
              apiKey='0ywy09pu3fif7crqzb9n5eygtvh5hwbbpj4vold92e6q9r11'
              init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofDescriptions footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
              }}
              onInit={(evt, editor) => editorRef.current = editor}
              onEditorChange={handleEditorChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Date Created:</label>
            <input
              type="date"
              name="DateCreated"
              value={editBlog ? editBlog.DateCreated : newBlog.DateCreated}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">User ID:</label>
            <input
              type="text"
              name="UserID"
              value={editBlog ? editBlog.UserID : newBlog.UserID}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {editBlog ? 'Update Blog' : 'Add Blog'}
          </button>
        </form>
      )}

      <h1 className="text-2xl font-bold text-black-500 mt-10 flex justify-center">Blog List</h1>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Date Created</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(blogs) ? (
            blogs.map((blog) => (
              <tr key={blog.BlogID} className="bg-gray-100">
                <td className="border p-2">{blog.Title}</td>
                <td className="border p-2" dangerouslySetInnerHTML={{ __html: blog.Description }}></td>
                <td className="border p-2">{blog.DateCreated}</td>
                <td className="border p-2">{blog.UserID}</td>
                <td className="border p-2 border-black">
                  <button onClick={() => handleEditClick(blog)} className="px-2 py-1 bg-green-500 text-white rounded mr-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => deleteBlog(blog.BlogID)} className="px-2 py-1 bg-red-500 text-white rounded">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-2 text-center">No blogs available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Blog;
