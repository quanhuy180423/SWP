import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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
    Images: [], // Cập nhật để lưu trữ nhiều ảnh
    QuantityGame: '',
    Size: '',
    WarrantyCard: '',
    Description: ''
  };

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [editProduct, setEditProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

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
      // Check if imageFiles are selected

      // Send POST request to API to add new product with imageFiles
      // FormData can be used to send image files along with other data
      // const formData = new FormData();
      // formData.append('Name', newProduct.Name);
      // newProduct.Images.forEach((image, index) => {
      //   formData.append(`Images[${index}]`, image);
      // });
      // ...
      // await fetch('API_ENDPOINT/products', {
      //   method: 'POST',
      //   body: formData
      // });

      // Update local state with new product
      // setProducts([...products, newProduct]);

      // Clear newProduct state
      // setNewProduct({ ...initialProductState });
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
    const files = Array.from(e.target.files);
    setNewProduct({ ...newProduct, Images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };

  return (
    <div className="font-sans mx-auto p-5">
      <h2 className="text-4xl font-bold mb-5">Product</h2>
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="px-5 py-2 mb-5 text-lg text-white bg-blue-500 rounded"
      >
        {isFormVisible ? 'Hide Form' : 'Add Product'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-5">
            <label className="block mb-2 font-bold">Product Name:</label>
            <input
              type="text"
              name="Name"
              value={newProduct.Name}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-bold">Material ID:</label>
            <input
              type="text"
              name="MaterialID"
              value={newProduct.MaterialID}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-bold">Gem ID:</label>
            <input
              type="text"
              name="GemID"
              value={newProduct.GemID}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border border-gray-300 rounded"
            />
          </div>
          {/* Add more input fields for other product properties */}
          <div className="mb-5">
            <label className="block mb-2 font-bold">Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 text-lg border border-gray-300 rounded mb-5"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-bold">Quantity Game:</label>
            <input
              type="text"
              name="QuantityGame"
              value={newProduct.QuantityGame}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-bold">Size:</label>
            <input
              type="text"
              name="Size"
              value={newProduct.Size}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-bold">Warranty Card:</label>
            <input
              type="text"
              name="WarrantyCard"
              value={newProduct.WarrantyCard}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-bold">Description:</label>
            <textarea
              name="Description"
              value={newProduct.Description}
              onChange={handleInputChange}
              className="w-full p-2 text-lg border border-gray-300 rounded h-24"
            ></textarea>
          </div>
          <button type="submit" className="px-5 py-2 text-lg text-white bg-green-500 hover:bg-green-600 rounded ">Create Product</button>
        </form>
      )}
      <h2 className="text-2xl font-bold mb-5">Product List</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 border-black">Name</th>
            <th className="border p-2 border-black">MaterialID</th>
            <th className="border p-2 border-black">GemID</th>
            <th className="border p-2 border-black">CategoryID</th>
            <th className="border p-2 border-black">MaterialCost</th>
            <th className="border p-2 border-black">GemCost</th>
            <th className="border p-2 border-black">ProductCost</th>
            <th className="border p-2 border-black">Images</th>
            <th className="border p-2 border-black">QuantityGame</th>
            <th className="border p-2 border-black">Size</th>
            <th className="border p-2 border-black">WarrantyCard</th>
            <th className="border p-2 border-black">Description</th>
            <th className="border p-2 border-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.ProductID} className="bg-gray-100">
              <td className="border p-2 border-black">{product.Name}</td>
              <td className="border p-2 border-black">{product.MaterialID}</td>
              <td className="border p-2 border-black">{product.GemID}</td>
              <td className="border p-2 border-black">{product.CategoryID}</td>
              <td className="border p-2 border-black">{product.MaterialCost}</td>
              <td className="border p-2 border-black">{product.GemCost}</td>
              <td className="border p-2 border-black">{product.ProductCost}</td>
              <td className="border p-2 border-black">
                {product.Images && product.Images.map((image, index) => (
                  <img key={index} src={image} alt={product.Name} className="w-16 h-16 object-cover inline-block" />
                ))}
              </td>
              <td className="border p-2 border-black">{product.QuantityGame}</td>
              <td className="border p-2 border-black">{product.Size}</td>
              <td className="border p-2 border-black">{product.WarrantyCard}</td>
              <td className="border p-2 border-black">{product.Description}</td>
              <td className="border p-2 border-black">
                <button onClick={() => setEditProduct(product)} className="px-2 py-1 text-white bg-green-500 rounded mr-2"><FontAwesomeIcon icon={faEdit} /></button>
                <button onClick={() => deleteProduct(product.ProductID)} className="px-2 py-1 text-white bg-red-500 rounded"><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
