import React, { useEffect, useState } from "react";
import axios from "axios";
import JewelryItem from "../JewelyPage/JewelryItem";
import { Link, useLocation } from "react-router-dom";

const Body = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const API_URL =
    "https://6660c0525425580055b51d87.mockapi.io/JewelyAPI/product";
  const categories = [
    "float",
    // "Ring",
    // "Necklace",
    // "Bracelet",
    // "Yellow Gold",
    // "White Gold",
    // "Silver",
  ];
  const location = useLocation();
  // State để lưu trạng thái slide hiện tại
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }

    axios
      .get(API_URL)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    // const carousel = document.querySelector(".carousel");
    // const prevButton = document.querySelector(".prev-button");
    // const nextButton = document.querySelector(".next-button");

    // Thiết lập tự động chuyển slide cho banner
    const interval = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide === 3 ? 0 : prevSlide + 1) // 3 là số ảnh slide có
      );
    }, 5000); // Chuyển slide mỗi 5 giây

    // Xoá interval khi component unmount
    return () => clearInterval(interval);
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const handleCategoryChange = (category) => {
  //   setSelectedCategory(category);
  //   navigate(`?category=${category}`);
  // };

  const renderProductsByCategory = (category) => {
    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    return (
      <div key={category} className="mb-8">
        <div className="flex justify-between">
          <Link to={`/jewelry?category=${category}`} className="text-gray-800">
            <h2 className="text-3xl font-bold mb-4 border-b-red-500  border-b-2">
              {category}
            </h2>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {filteredProducts.slice(0, 4).map((product) => (
            <JewelryItem
              key={product.productId}
              to={`/product/${product.productId}?category=${selectedCategory}`}
              firstImage={product.Image}
              title={product.Name}
              material={product.Material}
              gem={product.Gem}
              productCost={product.productCost}
              description={product.Description}
            />
          ))}
        </div>
        <div className="flex justify-center m-2  ">
          <Link
            to={`/jewelry?category=${category}`}
            className="text-gray-800 bg-gray-200 hover:bg-gray-300 border-2 border-gray-500 h-9 w-24"
          >
            <span className="flex justify-center items-center h-7">
              Xem thêm
            </span>
          </Link>
        </div>
        <div className="flex justify-center">
          <hr className="my-4 border-t-2 border-gray-300 w-10/12" />
        </div>
      </div>
    );
  };

  return (
    <div className="body min-h-screen bg-gray-100">
      <div>
        <div className="banner flex justify-center items-center">
          <div className="carousel-container relative overflow-hidden">
            <div
              className="carousel flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`, // Di chuyển slide dựa trên chỉ số hiện tại
              }}
            >
              <div className="carousel-item flex-none w-full">
                <img src="./img/banner1.png" alt="img 1" />
              </div>
              <div className="carousel-item flex-none w-full">
                <img src="./img/banner2.png" alt="img 2" />
              </div>
              <div className="carousel-item flex-none w-full">
                <img src="./img/banner3.png" alt="img 3" />
              </div>
              <div className="carousel-item flex-none w-full">
                <img src="./img/banner4.png" alt="img 4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <hr className="my-4 border-t-2 border-gray-300 w-10/12" />
      </div>

      <div className="container mx-auto my-2">
        {categories.map((category) => renderProductsByCategory(category))}
      </div>
    </div>
  );
};

export default Body;
