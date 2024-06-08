import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://6660c0525425580055b51d87.mockapi.io/JewelyAPI/product/${productId}`
      )
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    localStorage.setItem(product.id, product.name);
    sessionStorage.setItem(product.id, product.name);

    axios
      .post("http://your-server-address/add-to-cart", {
        productId: product.id,
        productName: product.name,
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

  const handleBuyNow = () => {
    localStorage.setItem(product.id, product.name);
    sessionStorage.setItem(product.id, product.name);

    axios
      .post("http://your-server-address/buy-now", {
        productId: product.id,
        productName: product.name,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Product purchased successfully!");
          window.location.href = "/checkout";
        } else {
          console.error("Failed to purchase product.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center p-5 bg-gray-100 w-full">
        <div className="flex flex-row max-w-5xl w-full bg-white shadow-md mb-5">
          <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
            {/* <img
              className="max-w-full max-h-96 object-cover transition-transform duration-200 ease-in-out"
              src={product.images[product.currentImageIndex]}
              alt={product.name}
            /> */}
            <img
              className="max-w-full max-h-96 object-cover transition-transform duration-200 ease-in-out"
              src={product.Image}
              alt={product.Name}
            />
            <div className="flex mt-4">
              {/* {product.images.map((img, index) => (
                <img
                  key={index}
                  className={`w-16 h-16 object-cover cursor-pointer border-2 ${
                    product.currentImageIndex === index
                      ? "border-red-600"
                      : "border-transparent"
                  }`}
                  src={img}
                  alt={`thumbnail ${index + 1}`}
                  onClick={() =>
                    setProduct({ ...product, currentImageIndex: index })
                  }
                />
              ))} */}
            </div>
          </div>
          <div className="flex-1 p-5">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <div className="mb-5">
              {/* <span className="line-through text-gray-500 mr-2">466.000 ₫</span> */}
              <span className="text-2xl text-red-600 font-bold">
                {product.productCost}₫
              </span>
            </div>
            <div className="mb-5">
              <p className="font-bold mb-2">Thuế:</p>
              <ul className="list-disc pl-5">
                {product.Desciption.split(",").map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center mb-5">
              <label htmlFor="quantity" className="mr-2 font-bold">
                Số lượng:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
                className="w-16 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 p-3 bg-red-600 text-white font-bold rounded hover:bg-red-700"
                onClick={handleAddToCart}
              >
                THÊM VÀO GIỎ HÀNG
              </button>
              <button
                className="flex-1 p-3 bg-red-600 text-white font-bold rounded hover:bg-red-700"
                onClick={handleBuyNow}
              >
                MUA NGAY
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
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <th className="border p-2 text-left bg-gray-100">
                  Mã sản phẩm
                </th>
                <td className="border p-2">{product.productId}</td>
              </tr>
              <tr>
                <th className="border p-2 text-left bg-gray-100">
                  Thương hiệu
                </th>
                <td className="border p-2">{product.brand}</td>
              </tr>
              <tr>
                <th className="border p-2 text-left bg-gray-100">Chất liệu</th>
                <td className="border p-2">{product.Material}</td>
              </tr>
              <tr>
                <th className="border p-2 text-left bg-gray-100">Kiểu dáng</th>
                <td className="border p-2">{product.style}</td>
              </tr>
              <tr>
                <th className="border p-2 text-left bg-gray-100">Bảo hành</th>
                <td className="border p-2">{product.warrantyCard}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Product;
