import axios from "axios";

// Cấu hình URL của API
const API_URL = "http://localhost:8090/test";

//Hàm sửa lý order
export const orderRequest = (orderRequest) =>
  axios.post(`${API_URL}/orderRequest`, orderRequest);
export const getOrderDetailByOrderId = (OrderId) =>
  axios.get(`${API_URL}/getOrderDetailByOrderId?OrderId=${OrderId}`);
// Hàm lấy danh sách sản phẩm
export const getAllProducts = () => axios.get(`${API_URL}/getAllProduct`);
export const getProductById = (ProductId) =>
  axios.get(`${API_URL}/getProductById?ProductId=${ProductId}`);
export const getProductsV2 = (id) =>
  axios.get(`${API_URL}/getProductByNameOrId?Name=${id}`);
export const insertProduct = (product) =>
  axios.post(`${API_URL}/insertProduct`, product);
export const updateProductById = (product) =>
  axios.put(`${API_URL}/updateProductById`, product);

export const updateStatusOrdeById = (OrderId, Status) =>
  axios.put(`${API_URL}/updateStatusOrdeById`, { OrderId, Status });
export const deleteProduct = (ProductId) =>
  axios.delete(`${API_URL}/deleteProductById`, { data: { ProductId } });

// Hàm lấy danh sách người dùng
export const getAllUsers = () => axios.get(`${API_URL}/getAllUser`);
export const registerUser = (user) => axios.post(`${API_URL}/register`, user);
export const getUserById = (UserId) =>
  axios.get(`${API_URL}/getUserById?UserId=${UserId}`);
export const updateUser = (id, user) =>
  axios.put(`${API_URL}/updateUserById`, { id, ...user });
export const deleteUser = (UserId) =>
  axios.delete(`${API_URL}/deleteUserById`, {
    data: { UserId },
  });

// Hàm lấy danh sách đơn hàng
export const getOrderByUserId = (UserId) =>
  axios.get(`${API_URL}/getOrderByUserId?UserId=${UserId}`);
export const getAllOrders = () => axios.get(`${API_URL}/getAllOrder`);
export const insertOrder = (order) =>
  axios.post(`${API_URL}/insertOrder`, order);
export const updateOrder = (order) =>
  axios.put(`${API_URL}/updateOrderById`, { order });
export const deleteOrder = (id) =>
  axios.delete(`${API_URL}/deleteOrderById`, { data: { id } });

// Hàm lấy danh sách đơn hàng chi tiết
export const getAllOrderDetails = () => axios.get(`${API_URL}/getAllOrder`);
// export const insertOrder = (order) =>
//   axios.post(`${API_URL}/insertOrder`, order);
// export const updateOrder = (id, order) =>
//   axios.put(`${API_URL}/updateOrderById`, { id, ...order });
export const deleteOrderDetail = (id) =>
  axios.delete(`${API_URL}/deleteOrderById`, { data: { id } });

// Hàm lấy danh mục
export const getAllCategories = () => axios.get(`${API_URL}/getAllCategory`);
export const insertCategory = (category) =>
  axios.post(`${API_URL}/insertCategory`, category);
export const updateCategory = (id, category) =>
  axios.put(`${API_URL}/updateCategoryById`, { id, ...category });
export const deleteCategory = (id) =>
  axios.delete(`${API_URL}/deleteCategoryById`, { data: { id } });

// Hàm lấy Material
export const getAllMaterial = () => axios.get(`${API_URL}/getAllMaterial`);
export const getAllCostMaterial = () =>
  axios.get(`${API_URL}/getAllCostMaterial`);
export const getMaterialById = (MaterialId) =>
  axios.get(`${API_URL}/getMaterialById?MaterialId=${MaterialId}`);
export const insertMaterial = (material) =>
  axios.post(`${API_URL}/insertMaterial`, material);
export const insertCostMaterial = (materialCost) =>
  axios.post(`${API_URL}/insertCostMaterial`, materialCost);
export const updateMaterial = (MaterialId, category) =>
  axios.put(`${API_URL}/updateMaterialById`, { MaterialId, ...category });
export const deleteMaterial = (MaterialId) =>
  axios.delete(`${API_URL}/deleteMaterialById`, { data: { MaterialId } });

// Hàm lấy Blogs
export const getAllBlogs = () => axios.get(`${API_URL}/getAllBlogs`);
export const getBlogsById = (MaterialId) =>
  axios.get(`${API_URL}/getBlogById?MaterialId=${MaterialId}`);
export const insertBlogs = (blogs) =>
  axios.post(`${API_URL}/insertBlog`, blogs);
export const updateBlogs = (MaterialId, category) =>
  axios.put(`${API_URL}/updateBlogById`, { MaterialId, ...category });
export const deleteBlogs = (blogId) =>
  axios.delete(`${API_URL}/deleteBlogById`, { data: { blogId } });

// Hàm lấy Diamond
export const getAllGem = () => axios.get(`${API_URL}/getAllGem`);
export const getGemById = (gemId) =>
  axios.get(`${API_URL}/getGemById?MaterialId=${gemId}`);
export const insertGem = (diamond) =>
  axios.post(`${API_URL}/insertGem`, diamond);
export const updateGemById = (MaterialId, category) =>
  axios.put(`${API_URL}/updateGemById`, { MaterialId, ...category });
export const deleteGemById = (gemId) =>
  axios.delete(`${API_URL}/deleteGemById`, { data: { gemId } });
