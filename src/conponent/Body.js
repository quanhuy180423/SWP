import React, { useEffect, useState } from "react";
import axios from "axios";
import JewelryItem from "../JewelyPage/JewelryItem";
import { Link, useLocation } from "react-router-dom";

const Body = () => {
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const API_URL_CATEGORY = "http://localhost:8090/test/getProductByCategory/1/";
  const categories = ["Ring", "Necklace", "Bracelet"];
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryNameFromUrl = searchParams.get("categoryName");
    if (categoryNameFromUrl) {
      setSelectedCategoryName(categoryNameFromUrl);
    }

    const fetchProductsByCategory = async (categoryName) => {
      try {
        const response = await axios.get(API_URL_CATEGORY, {
          params: { categoryName },
        });
        setProducts((prevProducts) => ({
          ...prevProducts,
          [categoryName]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    categories.forEach((category) => {
      fetchProductsByCategory(category);
    });

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 3 ? 0 : prevSlide + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderProductsByCategoryName = (categoryName) => {
    const filteredProducts = products[categoryName] || [];
    return (
      <div key={categoryName} className="mb-8">
        <div className="flex justify-between">
          <Link
            to={`/jewelry?categoryName=${categoryName}`}
            className="text-gray-800"
          >
            <h2 className="text-3xl font-bold mb-4 border-b-red-500 border-b-2">
              {categoryName}
            </h2>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {filteredProducts.slice(0, 4).map((product) => (
            <JewelryItem
              key={product.ProductID}
              to={`/product/${product.ProductID}`}
              firstImage={product.Image}
              title={product.Name}
              material={product.MaterialName}
              gem={product.GemName}
              productCost={product.ProductCost}
            />
          ))}
        </div>
        <div className="flex justify-center m-2">
          <Link
            to={`/jewelry?categoryName=${categoryName}`}
            className="text-gray-800 bg-gray-200 hover:bg-gray-300 border-2 border-gray-500 h-9 w-24"
          >
            <span className="flex justify-center items-center h-7">
              Xem thêm
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
                transform: `translateX(-${currentSlide * 100}%)`,
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

      {/* <div className="container mx-auto my-2">
        {categories.map((categoryName) =>
          renderProductsByCategoryName(categoryName)
        )}
      </div> */}
    </div>
  );
};

export default Body;
