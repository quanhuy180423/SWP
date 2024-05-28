// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../server/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');

  useEffect(() => {
    getProducts().then(response => setProducts(response.data));
  }, []);

  const handleAddProduct = () => {
    addProduct({ name: newProduct }).then(() => {
      setProducts([...products, { name: newProduct }]);
      setNewProduct('');
    });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id).then(() => {
      setProducts(products.filter(product => product.id !== id));
    });
  };

  return (
    <div>
      <h2>Product Management</h2>
      <input
        type="text"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
        placeholder="New Product"
      />
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
