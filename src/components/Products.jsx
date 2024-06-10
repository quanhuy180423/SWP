import React, { useState, useEffect } from 'react';

const Product = () => {
  const initialProductState = {
    ProductID: '',
    Name: '',
    MaterialID: '',
    GemID: '',
    CategoryID: '',
    MaterialCost: '',
    GemCost: '',
    ProductCost: '',
    Image: '',
    QuantityGame: '',
    Size: '',
    WarrantyCard: '',
    Description: ''
  };

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [editProduct, setEditProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch products data from API
      // const response = await fetch('API_ENDPOINT/products');
      // const data = await response.json();
      // setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      // Perform validation on newProduct data
      // Check if imageFile is selected

      // Send POST request to API to add new product with imageFile
      // FormData can be used to send image files along with other data
      // const formData = new FormData();
      // formData.append('Name', newProduct.Name);
      // formData.append('Image', imageFile);
      // ...
      // await fetch('API_ENDPOINT/products', {
      //   method: 'POST',
      //   body: formData
      // });

      // Update local state with new product
      // setProducts([...products, newProduct]);

      // Clear newProduct state and imageFile
      // setNewProduct({ ...initialProductState });
      // setImageFile(null);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      // Send DELETE request to API to delete product
      // await fetch(`API_ENDPOINT/products/${productId}`, {
      //   method: 'DELETE'
      // });

      // Update local state by removing the deleted product
      // setProducts(products.filter(product => product.ProductID !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProduct = async () => {
    try {
      // Perform validation on editProduct data

      // Send PUT request to API to update product
      // await fetch(`API_ENDPOINT/products/${editProduct.ProductID}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(editProduct)
      // });

      // Update local state with edited product
      // setProducts(products.map(product => {
      //   if (product.ProductID === editProduct.ProductID) {
      //     return editProduct;
      //   }
      //   return product;
      // }));

      // Clear editProduct state
      // setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
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
    fileInput: {
      width: '100%',
      padding: '8px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      marginBottom: '20px'
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
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px'
    },
    tableRow: {
      backgroundColor: '#f2f2f2'
    },
    
  };

  return (
    <div style={styles.container}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Name:</label>
          <input
            type="text"
            name="Name"
            value={newProduct.Name}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Material ID:</label>
          <input
            type="text"
            name="MaterialID"
            value={newProduct.MaterialID}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Gem ID:</label>
          <input
            type="text"
            name="GemID"
            value={newProduct.GemID}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        {/* Add more input fields for other product properties */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Quantity Game:</label>
          <input
            type="text"
            name="QuantityGame"
            value={newProduct.QuantityGame}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Size:</label>
          <input
            type="text"
            name="Size"
            value={newProduct.Size}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Warranty Card:</label>
          <input
            type="text"
            name="WarrantyCard"
            value={newProduct.WarrantyCard}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            name="Description"
            value={newProduct.Description}
            onChange={handleInputChange}
            style={{ ...styles.input, height: '100px' }}
          ></textarea>
        </div>
        <button type="submit" style={styles.button}>Add Product</button>
      </form >
      <br></br>
      <h2>Product List</h2>
        <tbody>
        <table style={styles.table}>
        <thead>
          <tr style={styles.tableRow}>
            <th>Name</th>
            <th>MaterialID</th>
            <th>GemID</th>
            <th>CategoryID</th>
            <th>MaterialCost</th>
            <th>GemCost</th>
            <th>ProductCost</th>
            <th>Image</th>
            <th>QuantityGame</th>
            <th>Size</th>
            <th>WarrantyCard</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through products and render each product */}
          {products.map(product => (
            <tr key={product.ProductID}>
              <td>{product.Name}</td>
              <td>{product.MaterialID}</td>
              <td>{product.GemID}</td>
              <td>{product.CategoryID}</td>
              <td>{product.MaterialCost}</td>
              <td>{product.GemCost}</td>
              <td>{product.ProductCost}</td>
              <td><img src={product.Image} alt={product.Name} style={styles.image} /></td>
              <td>{product.QuantityGame}</td>
              <td>{product.Size}</td>
              <td>{product.WarrantyCard}</td>
              <td>{product.Description}</td>
              <td>
                <button onClick={() => setEditProduct(product)}>Edit</button>
                <button onClick={() => deleteProduct(product.ProductID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </tbody>
      
    </div >
  );
};

export default Product;
