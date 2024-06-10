import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import React, { useState, useEffect } from 'react';

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    MaterialID: '',
    Name: '',
    Unit: '',
    BuyPrice: '',
    CostIdMaterial: ''
  });
  const [editMaterial, setEditMaterial] = useState(null);

  useEffect(() => {
    // Fetch materials data from API or local storage
    // For example:
    // fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      // Fetch materials data from API
      // const response = await fetch('API_ENDPOINT/materials');
      // const data = await response.json();
      // setMaterials(data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const addMaterial = async () => {
    try {
      // Perform validation on newMaterial data

      // Send POST request to API to add new material
      // await fetch('API_ENDPOINT/materials', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(newMaterial)
      // });

      // Update local state with new material
      // setMaterials([...materials, newMaterial]);

      // Clear newMaterial state
      // setNewMaterial({
      //   MaterialID: '',
      //   Name: '',
      //   Unit: '',
      //   BuyPrice: '',
      //   CostIdMaterial: ''
      // });
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  const deleteMaterial = async (materialId) => {
    try {
      // Send DELETE request to API to delete material
      // await fetch(`API_ENDPOINT/materials/${materialId}`, {
      //   method: 'DELETE'
      // });

      // Update local state by removing the deleted material
      // setMaterials(materials.filter(material => material.MaterialID !== materialId));
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  const updateMaterial = async () => {
    try {
      // Perform validation on editMaterial data

      // Send PUT request to API to update material
      // await fetch(`API_ENDPOINT/materials/${editMaterial.MaterialID}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(editMaterial)
      // });

      // Update local state with edited material
      // setMaterials(materials.map(material => {
      //   if (material.MaterialID === editMaterial.MaterialID) {
      //     return editMaterial;
      //   }
      //   return material;
      // }));

      // Clear editMaterial state
      // setEditMaterial(null);
    } catch (error) {
      console.error('Error updating material:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMaterial();
  };

  return (
    <div style={styles.container}>
      {/* <h2 style={styles.heading}>Material Management</h2> */}
      <h1 style={styles.subHeading} >Add New Material</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Name:</label>
          <input type="text" name="Name" value={newMaterial.Name} onChange={handleInputChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Unit:</label>
          <input type="text" name="Unit" value={newMaterial.Unit} onChange={handleInputChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Buy Price:</label>
          <input type="text" name="BuyPrice" value={newMaterial.BuyPrice} onChange={handleInputChange} style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Cost ID Material:</label>
          <input type="text" name="CostIdMaterial" value={newMaterial.CostIdMaterial} onChange={handleInputChange} style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Add Material</button>
      </form>
      {/* Material list for management */}
      <h1 style={styles.subHeading}>Material List</h1>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableRow}>
            <th>Name</th>
            <th>Unit</th>
            <th>Buy Price</th>
            <th>Cost ID Material</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through materials and render each material */}
          {materials.map(material => (
            <tr key={material.MaterialID}>
              <td>{material.Name}</td>
              <td>{material.Unit}</td>
              <td>{material.BuyPrice}</td>
              <td>{material.CostIdMaterial}</td>
              <td>
                <button onClick={() => setEditMaterial(material)}>Edit</button>
                <button onClick={() => deleteMaterial(material.MaterialID)}>Delete</button>
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
    padding: '20px'
  },
  heading: {
    color: 'blue',
    marginBottom: '20px'
  },
  subHeading: {
    color: 'green',
    marginBottom: '10px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px'
  },
  formGroup: {
    marginBottom: '10px'
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'blue',
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
  }
};

export default Material;

