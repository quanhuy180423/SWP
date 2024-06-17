import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Category = () => {
  const [categorys, setCategorys] = useState([]);
  const [newCategory, setNewCategory] = useState({
    CategoryID: '',
    Name: '',
    Description: ''
  });
  const [editCategory, setEditCategory] = useState(null);
  const [message, setMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const API_URL = "";

  useEffect(() => {
    fetchCategorys();
  }, []);

  const fetchCategorys = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategorys(response.data);
    } catch (error) {
      console.error('Error fetching Categorys:', error);
    }
  };

  const addCategory = async () => {
    try {
      await axios.post(API_URL, newCategory);
      setCategorys([...categorys, newCategory]);
      setNewCategory({
        CategoryID: '',
        Name: '',
        Description: ''
      });
      setMessage('Category added successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding Category:', error);
    }
  };

  const deleteCategory = async (CategoryID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Category?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${CategoryID}`);
        setCategorys(categorys.filter(category => category.CategoryID !== CategoryID));
        setMessage('Category deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting Category:', error);
      }
    }
  };

  const updateCategory = async () => {
    try {
      await axios.put(`${API_URL}/${editCategory.CategoryID}`, editCategory);
      setCategorys(categorys.map(category => (category.CategoryID === editCategory.CategoryID ? editCategory : category)));
      setEditCategory(null);
      setMessage('Category updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating Category:', error);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editCategory) {
      updateCategory();
    } else {
      addCategory();
    }
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
          <label htmlFor="name" className="block">Name</label>
          <select id="name" name="name" value={editCategory ? editCategory.Name : newCategory.Name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="customer">Dây chuyền</option>
            <option value="staff">Nhẫn</option>
            <option value="admin">Vòng tay</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block">Description</label>
          <input type="text" id="description" name="description" value={editCategory ? editCategory.Description : newCategory.Description} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
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
            
          </tr>
        </thead>
        <tbody>
          {categorys.map((category) => (
            <tr key={category.CategoryID} className="bg-gray-100">
              <td className="border p-2 border-black">{category.Name}</td>
              <td className="border p-2 border-black">{category.Description}</td>   
              <td className="border p-2 border-black">
                <button onClick={() => setEditCategory(category)} className="px-2 py-1 bg-green-500 text-white rounded mr-2">
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
