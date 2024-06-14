import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    // id: '',
    id: '',
    userName: '',
    passWord: '',
    fullName: '',
    phone: '',
    address: '',
    email: '',
    role: 'customer',

  });
  const [editAccount, setEditAccount] = useState(null);
  const [message, setMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const API_URL = "https://6660c0525425580055b51d87.mockapi.io/JewelyAPI/User";

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(API_URL);
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const addAccount = async () => {
    try {
      await axios.post(API_URL, newAccount);
      setAccounts([...accounts, newAccount]);
      setNewAccount({
        // id: '',
        id: '', 
        userName: '',
        passWord: '',
        fullName: '',
        phone: '',
        address: '',
        email: '',
        role: 'customer',
      });
      setMessage('Account added successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  const deleteAccount = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this account?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setAccounts(accounts.filter(account => account.id !== id));
        setMessage('Account deleted successfully');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const updateAccount = async () => {
    try {
      await axios.put(`${API_URL}/${editAccount.id}`, editAccount);
      setAccounts(accounts.map(account => (account.id === editAccount.id ? editAccount : account)));
      setEditAccount(null);
      console.log(accounts)
      setMessage('Account updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editAccount) {
      setEditAccount({ ...editAccount, [name]: value });
    } else {
      setNewAccount({ ...newAccount, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editAccount) {
      updateAccount();
    } else {
      addAccount();
    }
  };

  return (
    <div className="font-sans p-5">
      <h1 className="text-4xl font-bold text-black-500 mb-5 flex justify-center">Add New account</h1>
      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="px-5 py-2 mb-5 text-lg text-white bg-blue-500 rounded"
      >
        {isFormVisible ? 'Hide Form' : 'Add account'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <input type="text" name="id" value={accounts.id} />
        <div className="mb-4">
          <label htmlFor="userName" className="block">Username</label>
          <input type="text" id="userName" name="userName" value={editAccount ? editAccount.userName : newAccount.userName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="passWord" className="block">Password</label>
          <input type="passWord" id="passWord" name="passWord" value={editAccount ? editAccount.passWord : newAccount.passWord} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="fullName" className="block">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={editAccount ? editAccount.fullName : newAccount.fullName} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block">Phone</label>
          <input type="text" id="phone" name="phone" value={editAccount ? editAccount.phone : newAccount.phone} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block">Address</label>
          <input type="text" id="address" name="address" value={editAccount ? editAccount.address : newAccount.address} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">Email</label>
          <input type="text" id="email" name="email" value={editAccount ? editAccount.email : newAccount.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block">Role</label>
          <select id="role" name="role" value={editAccount ? editAccount.role : newAccount.role} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {editAccount ? 'Update Accont' : 'Add Account'}
          </button>
        </form>
      )}

      <h1 className="text-2xl font-bold text-black-500 mt-10 flex justify-center">Account List</h1>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr className="bg-gray-200">
          <th className="border p-2 border-black">User ID</th>
            <th className="border p-2 border-black">User Name</th>
            <th className="border p-2 border-black">Password</th>
            <th className="border p-2 border-black">Full Name</th>
            <th className="border p-2 border-black">Phone</th>
            <th className="border p-2 border-black">Address</th>
            <th className="border p-2 border-black">Email</th>
            <th className="border p-2 border-black">Role</th>
            <th className="border p-2 border-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id} className="bg-gray-100">
              <td className="border p-2 border-black">{account.id}</td>
              <td className="border p-2 border-black">{account.userName}</td>
              <td className="border p-2 border-black">{account.passWord}</td>
              <td className="border p-2 border-black">{account.fullName}</td>
              <td className="border p-2 border-black">{account.phone}</td>
              <td className="border p-2 border-black">{account.address}</td>
              <td className="border p-2 border-black">{account.email}</td>
              <td className="border p-2 border-black">{account.role}</td>
              <td className="border p-2 border-black">
                <button onClick={() => setEditAccount(account)} className="px-2 py-1 bg-green-500 text-white rounded mr-2">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => deleteAccount(account.id)} className="px-2 py-1 bg-red-500 text-white rounded">
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

export default Account;
