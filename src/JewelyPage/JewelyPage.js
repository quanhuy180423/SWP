import React, { useEffect, useState } from "react";
import axios from "axios";
import JewelryItem from "./JewelryItem";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, CircularProgress, Pagination } from "@mui/material";

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

  const fetchProducts = async (searchValue, categoryFromUrl) => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      let response;
      if (searchValue) {
        response = await axios.get(API_URL_SEARCH, {
          params: { name: searchValue },
        });
      } else if (categoryFromUrl) {
        response = await axios.get(API_URL_CATEGORY, {
          params: { CategoryName: categoryFromUrl },
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchValueFromUrl = searchParams.get("search") || "";
    const categoryFromUrl = searchParams.get("CategoryName") || "";

    setSearchValue(searchValueFromUrl);
    setSelectedCategory(categoryFromUrl);

    fetchProducts(searchValueFromUrl, categoryFromUrl);
  }, [location.search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
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

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (CategoryName) => {
    setSelectedCategory(CategoryName);
    setCurrentPage(1);
    navigate(
      CategoryName ? `?CategoryName=${CategoryName}` : `?search=${searchValue}`
    );
  };

  return (
    <div>
      <img
        src="./img/page_trang_suc.png"
        alt="img 1"
        className="article-img mb-5 w-full"
      />
      <h1 className="text-4xl font-bold flex justify-center mb-4">Trang sức</h1>
      <div className="flex justify-center flex-wrap mb-4">
        <Button
          onClick={() => handleCategoryChange("Rings")}
          variant={selectedCategory === "Rings" ? "contained" : "outlined"}
          className="m-2"
          style={{ marginRight: "20px" }}
        >
          Nhẫn
        </Button>
        <Button
          onClick={() => handleCategoryChange("Necklaces")}
          variant={selectedCategory === "Necklaces" ? "contained" : "outlined"}
          className="m-2"
          style={{ marginRight: "20px" }}
        >
          Vòng cổ
        </Button>
        <Button
          onClick={() => handleCategoryChange("Bracelets")}
          variant={selectedCategory === "Bracelets" ? "contained" : "outlined"}
          className="m-2"
        >
          Vòng tay
        </Button>
      </div>

      <Grid
        container
        spacing={4}
        className="flex justify-center "
        marginTop={"20px"}
      >
        {currentProducts.map((product) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={product.ProductID}
            className="p-5 mx-5 rounded-lg shadow-md"
          >
            <JewelryItem
              to={`/product/${product.ProductId}`}
              firstImage={product.Image[0]}
              title={product.Name}
              material={product.MaterialName}
              gem={product.GemName}
              productCost={product.ProductCost}
            />
          </Grid>
        ))}
      </Grid>

      <div className="flex justify-center my-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default JewelryPage;
