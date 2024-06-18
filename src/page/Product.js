// Product.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:8090/test/getProductById`, {
          params: { productId },
        })
        .then((response) => setProduct(response.data))
        .catch((error) => console.error("Error fetching product:", error));
    } else {
      console.error("ProductId is undefined");
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    localStorage.setItem(product.ProductID, product.Name);
    sessionStorage.setItem(product.ProductID, product.Name);

    axios
      .post("http://your-server-address/add-to-cart", {
        productId: product.productId,
        productName: product.Name,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Product added to cart successfully!");
        } else {
          console.error("Failed to add product to cart.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleOrder = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      setShowLoginForm(true);
      return;
    }

    const orderDetails = {
      productId: product.productId,
      Name: product.Name,
      CategoryName: product.CategoryName,
      ProductCost: product.ProductCost,
      Image: product.Image,
      Size: size,
      Quantity: quantity,
    };
    console.log(orderDetails);
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    navigate("/order-review");
  };

  return (
    <>
      <div className="flex flex-col items-center p-5 bg-gray-100 w-full">
        <div className="flex flex-row max-w-5xl w-full bg-white shadow-md mb-5">
          <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
            <img
              className="max-w-full max-h-96 object-cover transition-transform duration-200 ease-in-out"
              src={product.Image}
              alt={product.Name}
            />
            <div className="flex mt-4">
              {/* Image thumbnails (if needed) */}
            </div>
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
            <div className="mb-5">
              <p className="font-bold mb-2">Description:</p>
              <ul className="list-disc pl-5">
                {product.Description.split(",").map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
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
                <td className="px-6 py-4">{product.Material}</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Đá</td>
                <td className="px-6 py-4">{product.Gem}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Product;
