import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    // MaterialID: '',
    // Name: '',
    // Unit: '',
    // BuyPrice: '',
    // CostIdMaterial: ''
    id: '',
    name: '',
    unit: '',
    buyPrice: '',
    costIdMaterial: ''
  });
  const [editMaterial, setEditMaterial] = useState(null);
  const [message, setMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const API_URL = "https://66673910a2f8516ff7a6cb53.mockapi.io/Jewelry/Material";

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(API_URL);
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const addMaterial = async () => {
    try {
      await axios.post(API_URL, newMaterial);
      setMaterials([...materials, newMaterial]);
      setNewMaterial({
        // MaterialID: '',
        // Name: '',
        // Unit: '',
        // BuyPrice: '',
        // CostIdMaterial: ''
        id: '',
        name: '',
        unit: '',
        buyPrice: '',
        costIdMaterial: ''
      });
      setMessage('Material added successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  const deleteMaterial = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this material?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setMaterials(materials.filter(material => material.id !== id));
        setMessage('Material deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting material:', error);
      }
    }
  };

  const updateMaterial = async () => {
    try {
      await axios.put(`${API_URL}/${editMaterial.id}`, editMaterial);
      setMaterials(materials.map(material => (material.id === editMaterial.id ? editMaterial : material)));
      setEditMaterial(null);
      setMessage('Material updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating material:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editMaterial) {
      setEditMaterial({ ...editMaterial, [name]: value });
    } else {
      setNewMaterial({ ...newMaterial, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMaterial) {
      updateMaterial();
    } else {
      addMaterial();
    }
  };

  return (
    <div className="font-sans p-5">
      <h1 className="text-4xl font-bold text-black-500 mb-5 flex justify-center">Add New Material</h1>
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="px-5 py-2 mb-5 text-lg text-white bg-blue-500 rounded"
      >
        {isFormVisible ? 'Hide Form' : 'Add Material'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={editMaterial ? editMaterial.name : newMaterial.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Unit:</label>
            <input
              type="text"
              name="unit"
              value={editMaterial ? editMaterial.unit : newMaterial.unit}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Buy Price:</label>
            <input
              type="text"
              name="buyPrice"
              value={editMaterial ? editMaterial.buyPrice : newMaterial.buyPrice}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Cost ID Material:</label>
            <input
              type="text"
              name="costIdMaterial"
              value={editMaterial ? editMaterial.costIdMaterial : newMaterial.costIdMaterial}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {editMaterial ? 'Update Material' : 'Add Material'}
          </button>
        </form>
      )}

      <h1 className="text-2xl font-bold text-black-500 mt-10 flex justify-center">Material List</h1>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 border-black">Name</th>
            <th className="border p-2 border-black">Unit</th>
            <th className="border p-2 border-black">Buy Price</th>
            <th className="border p-2 border-black">Cost ID Material</th>
            <th className="border p-2 border-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id} className="bg-gray-100">
              <td className="border p-2 border-black">{material.name}</td>
              <td className="border p-2 border-black">{material.unit}</td>
              <td className="border p-2 border-black">{material.buyPrice}</td>
              <td className="border p-2 border-black">{material.costIdMaterial}</td>
              <td className="border p-2 border-black">
                <button onClick={() => setEditMaterial(material)} className="px-2 py-1 bg-green-500 text-white rounded mr-2">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => deleteMaterial(material.id)} className="px-2 py-1 bg-red-500 text-white rounded">
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

export default Material;
