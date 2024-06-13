import { useEffect, useState } from "react";
import axios from "axios";
import JewelryItem from "./JewelryItem";
import { useLocation, useNavigate } from "react-router-dom";

const JewelryPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const API_URL =
    "https://6660c0525425580055b51d87.mockapi.io/JewelyAPI/product"; //Link Api get product, show all
  const Category1 = "Ring";
  const Category2 = "Necklace";
  const Category3 = "Bracelet";
  const Category4 = "Yellow Gold";
  const Category5 = "White Gold";
  const Category6 = "Sliver";

  const productsPerPage = 25;

  const location = useLocation();
  const navigate = useNavigate();

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
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handler for navigating pages
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handler for changing category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page whenever the category changes
    navigate(`?category=${category}`); // Update URL with selected category
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
              onClick={() => handleCategoryChange("float")} //category1
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === "float" ? "bg-gray-300" : "" //category1
              }`}
            >
              Nhẫn
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange(Category2)}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === Category2 ? "bg-gray-300" : ""
              }`}
            >
              Vòng cổ
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange(Category3)}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === Category3 ? "bg-gray-300" : ""
              }`}
            >
              Vòng tay
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange(Category4)}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === Category4 ? "bg-gray-300" : ""
              }`}
            >
              Trang sức vàng
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange(Category5)}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === Category5 ? "bg-gray-300" : ""
              }`}
            >
              Trang sức vàng trắng
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleCategoryChange(Category6)}
              className={`bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black ${
                selectedCategory === Category6 ? "bg-gray-300" : ""
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
