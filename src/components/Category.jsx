import React, { useState, useEffect } from 'react';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    categoryID: '',
    Description: '',
    Name: ''
  });
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Fetch categories data from API
      // const response = await fetch('API_ENDPOINT/categories');
      // const data = await response.json();
      // setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async () => {
    try {
      // Perform validation on newCategory data

      // Send POST request to API to add new category
      // await fetch('API_ENDPOINT/categories', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(newCategory)
      // });

      // Update local state with new category
      // setCategories([...categories, newCategory]);

      // Clear newCategory state
      // setNewCategory({ categoryID: '', Description: '', Name: '' });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      // Send DELETE request to API to delete category
      // await fetch(`API_ENDPOINT/categories/${categoryId}`, {
      //   method: 'DELETE'
      // });

      // Update local state by removing the deleted category
      // setCategories(categories.filter(category => category.categoryID !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const updateCategory = async () => {
    try {
      // Perform validation on editCategory data

      // Send PUT request to API to update category
      // await fetch(`API_ENDPOINT/categories/${editCategory.categoryID}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(editCategory)
      // });

      // Update local state with edited category
      // setCategories(categories.map(category => {
      //   if (category.categoryID === editCategory.categoryID) {
      //     return editCategory;
      //   }
      //   return category;
      // }));

      // Clear editCategory state
      // setEditCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory();
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: 'auto',
      padding: '20px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold'
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
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Category Name:</label>
          <input
            type="text"
            name="Name"
            value={newCategory.Name}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            name="Description"
            value={newCategory.Description}
            onChange={handleInputChange}
            style={styles.textarea}
          ></textarea>
        </div>
        <button type="submit" style={styles.button}>Add Category</button>
      </form>
      <h2>Category List</h2>
      <ul>
        {categories.map(category => (
          <li key={category.categoryID}>
            {category.Name}
            <button onClick={() => setEditCategory(category)}>Edit</button>
            <button onClick={() => deleteCategory(category.categoryID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
