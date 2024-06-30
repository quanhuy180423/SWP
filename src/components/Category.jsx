import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    CategoryID: '',
    Name: '',
    Description: ''
  });
  const [editCategory, setEditCategory] = useState(null);
  const [message, setMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const editorRef = useRef(null);
  const API_URL = "https://667a627cbd627f0dcc8ea52b.mockapi.io/requestOrder"; // Replace with your actual API endpoint

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async () => {
    try {
      const response = await axios.post(API_URL, newCategory);
      setCategories([...categories, response.data]);
      setNewCategory({
        CategoryID: '',
        Name: '',
        Description: ''
      });
      editorRef.current.resetContent();
      setMessage('Category added successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const deleteCategory = async (CategoryID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${CategoryID}`);
        setCategories(categories.filter(category => category.CategoryID !== CategoryID));
        setMessage('Category deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const updateCategory = async () => {
    try {
      const response = await axios.put(`${API_URL}/${editCategory.CategoryID}`, editCategory);
      setCategories(categories.map(category =>
        category.CategoryID === editCategory.CategoryID ? response.data : category
      ));
      editorRef.current.resetContent();
      setEditCategory(null);
      setMessage('Category updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editCategory) {
      setEditCategory({ ...editCategory, [name]: value });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  const handleEditorChange = (content, editor) => {
    if (editCategory) {
      setEditCategory({ ...editCategory, Description: content });
    } else {
      setNewCategory({ ...newCategory, Description: content });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editCategory) {
      updateCategory();
    } else {
      addCategory();
    }
  };

  const handleEditClick = (category) => {
    setIsFormVisible(true);
    editorRef.current.setContent(category.Description);
    setEditCategory(category);
  };

  return (
    <div className="font-sans p-5">
      <h1 className="text-4xl font-bold text-black-500 mb-5 flex justify-center">Add New Category</h1>
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="px-5 py-2 mb-5 text-lg text-white bg-blue-500 rounded"
      >
        {isFormVisible ? 'Hide Form' : 'Add Category'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className="mb-4">
            <label htmlFor="Name" className="block">Name</label>
            <input
              type="text"
              name="Name"
              value={editCategory ? editCategory.Name : newCategory.Name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Description" className="block">Description</label>
            <Editor
              apiKey='0ywy09pu3fif7crqzb9n5eygtvh5hwbbpj4vold92e6q9r11'
              init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
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
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {editCategory ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      )}

      <h1 className="text-2xl font-bold text-black-500 mt-10 flex justify-center">Category List</h1>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 border-black">Name</th>
            <th className="border p-2 border-black">Description</th>
            <th className="border p-2 border-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.CategoryID} className="bg-gray-100">
              <td className="border p-2 border-black">{category.Name}</td>
              <td className="border p-2 border-black" dangerouslySetInnerHTML={{ __html: category.Description }}></td>
              <td className="border p-2 border-black">
                <button onClick={() => handleEditClick(category)} className="px-2 py-1 bg-green-500 text-white rounded mr-2">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => deleteCategory(category.CategoryID)} className="px-2 py-1 bg-red-500 text-white rounded">
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

export default Category;
