// src/services/api.js
import axios from 'axios';

const API_URL = 'http://your-server-address/api';

export const getGoldPrices = () => axios.get(`${API_URL}/gold-prices`);
export const getDiamondPrices = () => axios.get(`${API_URL}/diamond-prices`);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getOrders = () => axios.get(`${API_URL}/orders`);
export const getProducts = () => axios.get(`${API_URL}/products`);

export const addUser = (user) => axios.post(`${API_URL}/users`, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

export const addOrder = (order) => axios.post(`${API_URL}/orders`, order);
export const updateOrder = (id, order) => axios.put(`${API_URL}/orders/${id}`, order);
export const deleteOrder = (id) => axios.delete(`${API_URL}/orders/${id}`);

export const addProduct = (product) => axios.post(`${API_URL}/products`, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}/products/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);
