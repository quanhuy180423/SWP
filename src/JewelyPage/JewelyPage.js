import { useEffect, useState } from "react";
import axios from "axios";
import JewelryItem from "./JewelryItem";
import { Link } from "react-router-dom";

const JewelyPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;

  useEffect(() => {
    axios
      .get("https://6660c0525425580055b51d87.mockapi.io/JewelyAPI/product")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handler for navigating pages
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            <Link to="/jewely">
              <button className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black">
                Vòng cổ
              </button>
            </Link>
          </div>
          <div className="m-2">
            <Link to="/jewely">
              <button className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black">
                Vòng tay
              </button>
            </Link>
          </div>
          <div className="m-2">
            <Link to="/jewely">
              <button className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black">
                Trang sức vàng
              </button>
            </Link>
          </div>
          <div className="m-2">
            <Link to="/jewely">
              <button className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black">
                Trang sức bạc
              </button>
            </Link>
          </div>
          <div className="m-2">
            <Link to="/jewely">
              <button className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black">
                Trang sức vàng trắng
              </button>
            </Link>
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
              material={product.Material}
              gem={product.Gem}
              productCost={product.productCost}
              description={product.Desciption}
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

export default JewelyPage;
