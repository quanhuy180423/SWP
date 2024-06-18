import { useEffect, useState } from "react";
import axios from "axios";
import JewelryItem from "./JewelryItem";
import { useLocation, useNavigate } from "react-router-dom";

const JewelryPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const API_URL = "http://localhost:8090/test/getAllProduct"; // Link API get product, show all

  const productsPerPage = 25;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get("CategoryName");
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
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.CategoryName === selectedCategory)
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (CategoryName) => {
    setSelectedCategory(CategoryName);
    setCurrentPage(1);
    navigate(`?CategoryName=${CategoryName}`);
  };

  return (
    <div>
      <img
        src="./img/page_trang_suc.png"
        alt="img 1"
        className="article-img mb-5"
      />
      <h1 className="text-4xl font-bold flex justify-center mb-4">Trang sức</h1>
      <div className="flex justify-center">
        <div className="flex justify-around">
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange("Ring")}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === "Ring" ? "bg-gray-300" : ""
              }`}
            >
              Nhẫn
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange("Necklace")}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === "Necklace" ? "bg-gray-300" : ""
              }`}
            >
              Vòng cổ
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange("Bracelet")}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === "Bracelet" ? "bg-gray-300" : ""
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
              key={product.productId}
              to={`/product/${product.productId}`}
              firstImage={product.Image}
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
