import axios from "axios";

// Cấu hình URL của API
const API_URL = "http://localhost:8090/test";

// Hàm lấy danh sách sản phẩm
export const getAllProducts = () => axios.get(`${API_URL}/getAllProduct`);
export const getProductById = (id) =>
  axios.get(`${API_URL}/getProductById?id=${id}`);
export const insertProduct = (product) =>
  axios.post(`${API_URL}/insertProduct`, product);
export const updateProduct = (id, product) =>
  axios.put(`${API_URL}/updateProductById`, { id, ...product });
export const deleteProduct = (id) =>
  axios.delete(`${API_URL}/deleteProductById`, { data: { id } });

// Hàm lấy danh sách người dùng
export const getAllUsers = () => axios.get(`${API_URL}/getAllUser`);
export const registerUser = (user) => axios.post(`${API_URL}/register`, user);
export const updateUser = (id, user) =>
  axios.put(`${API_URL}/updateUserById`, { id, ...user });
export const deleteUser = (userId) =>
  axios.delete(`${API_URL}/deleteUserById`, { userId: { userId } });

// Hàm lấy danh sách đơn hàng
export const getAllOrders = () => axios.get(`${API_URL}/getAllOrder`);
export const insertOrder = (order) =>
  axios.post(`${API_URL}/insertOrder`, order);
export const updateOrder = (id, order) =>
  axios.put(`${API_URL}/updateOrderById`, { id, ...order });
export const deleteOrder = (id) =>
  axios.delete(`${API_URL}/deleteOrderById`, { data: { id } });

// Hàm lấy danh mục
export const getAllCategories = () => axios.get(`${API_URL}/getAllCategory`);
export const insertCategory = (category) =>
  axios.post(`${API_URL}/insertCategory`, category);
export const updateCategory = (id, category) =>
  axios.put(`${API_URL}/updateCategoryById`, { id, ...category });
export const deleteCategory = (id) =>
  axios.delete(`${API_URL}/deleteCategoryById`, { data: { id } });
