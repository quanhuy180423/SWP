import React, { useEffect, useState } from "react";
import axios from "axios";
import JewelryItem from "./JewelryItem";
import { useLocation, useNavigate } from "react-router-dom";

const JewelryPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8090/test/getAllProduct";
  const API_URL_CATEGORY = "http://localhost:8090/test/getProductByCategory";
  const API_URL_SEARCH = "http://localhost:8090/test/getProductByNameOrId";

  const productsPerPage = 25;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchValueFromUrl = searchParams.get("search") || "";
    const categoryFromUrl = searchParams.get("categoryName") || "";

    setSearchValue(searchValueFromUrl);
    setSelectedCategory(categoryFromUrl);

    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        let response;
        if (searchValueFromUrl) {
          response = await axios.get(API_URL_SEARCH, {
            params: { name: searchValueFromUrl },
          });
        } else if (categoryFromUrl) {
          response = await axios.get(API_URL_CATEGORY, {
            params: { categoryName: categoryFromUrl },
          });
        } else {
          response = await axios.get(API_URL);
        }
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
    navigate(`?categoryName=${categoryName}&search=${searchValue}`);
  };

  return (
    <div>
      <img
        src="./img/page_trang_suc.png"
        alt="img 1"
        className="article-img mb-5 w-full"
      />
      <h1 className="text-4xl font-bold flex justify-center mb-4">Trang sức</h1>
      <div className="flex justify-center flex-wrap">
        <div className="flex justify-around flex-wrap">
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange("Rings")}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === "Rings" ? "bg-gray-300" : ""
              }`}
            >
              Nhẫn
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange("Necklaces")}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === "Necklaces" ? "bg-gray-300" : ""
              }`}
            >
              Vòng cổ
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange("Bracelets")}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === "Bracelets" ? "bg-gray-300" : ""
              }`}
            >
              Vòng tay
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange("Yellow Gold")}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === "Yellow Gold" ? "bg-gray-300" : ""
              }`}
            >
              Trang sức vàng
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange("White Gold")}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === "White Gold" ? "bg-gray-300" : ""
              }`}
            >
              Trang sức vàng trắng
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange("Silver")}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === "Silver" ? "bg-gray-300" : ""
              }`}
            >
              Trang sức bạc
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <hr className="my-4 border-t-2 border-gray-300 w-10/12" />
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-10/12">
          {currentProducts.map((product) => (
            <JewelryItem
              key={product.ProductID}
              to={`/product/${product.ProductID}`}
              firstImage="https://th.bing.com/th/id/OIF.72OUna9vZtxLRpFvVGE5Wg?rs=1&pid=ImgDetMain"
              // firstImage={product.Image}
              title={product.Name}
              material={product.MaterialName}
              gem={product.GemName}
              productCost={product.ProductCost}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center my-4">
        <nav>
          <ul className="flex list-none">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className="mx-1">
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border ${
                    currentPage === index + 1
                      ? "bg-gray-300"
                      : "bg-white hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default JewelryPage;
