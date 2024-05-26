// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from '../server/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    getUsers().then(response => setUsers(response.data));
  }, []);

  const handleAddUser = () => {
    addUser({ name: newUser }).then(() => {
      setUsers([...users, { name: newUser }]);
      setNewUser('');
    });
  };

  const handleDeleteUser = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter(user => user.id !== id));
    });
  };

  return (
    <div>
      <h2>User Management</h2>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="New User"
      />
      <button onClick={handleAddUser}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
