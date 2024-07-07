import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../cart/CartContext";
import { Box } from "@mui/material";
import Swipper from "../Swipper/Swipper"; // Adjust the import path as needed

const Product = () => {
  const { ProductId } = useParams();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const API_URL = "http://localhost:8090/test/getProductByNameOrId";

  const fetchProductData = async () => {
    if (ProductId) {
      try {
        const response = await axios.get(`${API_URL}?Name=${ProductId}`);
        const data = response.data;
        if (data[0]) {
          setProduct(data[0]);
          console.log(product);
        } else {
          console.error(`No product found with ID ${ProductId}`);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    } else {
      console.error("Product ID not found in URL params");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [ProductId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    console.log(product);
    addToCart(product, parseInt(quantity));
  };

  const handleOrder = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      setShowLoginForm(true);
      return;
    }

    const img =
      "https://th.bing.com/th/id/OIF.72OUna9vZtxLRpFvVGE5Wg?rs=1&pid=ImgDetMain";
    const orderDetails = {
      ProductId: product.ProductId,
      Name: product.Name,
      CategoryName: product.CategoryName,
      ProductCost: product.ProductCost,
      Image: img,
      Size: size,
      Quantity: quantity,
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    navigate("/order");
  };

  return (
    <>
      <div className="flex flex-col items-center p-5 bg-gray-100 w-full">
        <div className="flex flex-row max-w-5xl w-full bg-white shadow-md mb-5">
          <div className="flex-1 flex flex-col items-center justify-center overflow-hidden h-80">
            <Swipper images={product.Image} /> {/* Use the Swipper component */}
          </div>
          <div className="flex-1 p-5">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {product.Name}
            </h1>
            <div className="mb-5">
              <span className="text-2xl text-red-600 font-bold">
                {product.ProductCost}₫
              </span>
            </div>

            {product.CategoryName === "Ring" ? (
              <div className="mb-5">
                <label htmlFor="size" className="mr-2 font-bold">
                  Ring Size:
                </label>
                <select
                  id="size"
                  name="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                >
                  {[9, 10, 11, 12, 13, 14].map((ringSize) => (
                    <option key={ringSize} value={ringSize}>
                      {ringSize}
                    </option>
                  ))}
                </select>
              </div>
            ) : product.CategoryName === "Necklace" ? (
              <div className="mb-5">
                <label htmlFor="size" className="mr-2 font-bold">
                  Necklace Size:
                </label>
                <select
                  id="size"
                  name="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                >
                  {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44].map(
                    (necklaceSize) => (
                      <option key={necklaceSize} value={necklaceSize}>
                        {necklaceSize}
                      </option>
                    )
                  )}
                </select>
              </div>
            ) : null}

            <div className="flex items-center mb-5">
              <label htmlFor="quantity" className="mr-2 font-bold">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-16 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 p-3 bg-red-600 text-white font-bold rounded hover:bg-red-700"
                onClick={handleOrder}
              >
                ORDER
              </button>
              <button
                className="flex-1 p-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-5xl w-full bg-white shadow-md p-5">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            CHI TIẾT SẢN PHẨM
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Tham chiếu {product.Name}
          </p>
          <table className="min-w-full divide-y divide-gray-200 text-left text-gray-600">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chi tiết
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông số
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">Danh mục</td>
                <td className="px-6 py-4">{product.CategoryName}</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Tên</td>
                <td className="px-6 py-4">{product.Name}</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Giá</td>
                <td className="px-6 py-4">{product.ProductCost}₫</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Chất liệu</td>
                <td className="px-6 py-4">{product.MaterialName}</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Kim cương</td>
                <td className="px-6 py-4">{product.GemName}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Box>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Description</h1>
          <Box dangerouslySetInnerHTML={{ __html: product.Description }} />
        </Box>
      </div>
    </>
  );
};

export default Product;
