import React from "react";
import '../css/Product.css';
import Footer from "../conponent/Footer";
import Header from "../conponent/Header";

const Product = () => {

  const handleAddToCart = () => {
    const productKey = "DCN0470";
    const productValue = "Dây chuyền bạc nữ mặt trái tim đôi DCN0470";
    
    // Lưu thông tin sản phẩm vào localStorage
    localStorage.setItem(productKey, productValue);
    
    // Lưu thông tin sản phẩm vào session
    sessionStorage.setItem(productKey, productValue);
    
    // Thực hiện gửi dữ liệu về server nếu cần thiết
    fetch('http://your-server-address/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productKey,
        productName: productValue,
      }),
    }).then(response => {
      if (response.ok) {
        console.log("Product added to cart successfully!");
      } else {
        console.error("Failed to add product to cart.");
      }
    }).catch(error => {
      console.error("Error:", error);
    });
  };

  const handleBuyNow = () => {
    const productKey = "DCN0470";
    const productValue = "Dây chuyền bạc nữ mặt trái tim đôi DCN0470";
    
    // Lưu thông tin sản phẩm vào localStorage
    localStorage.setItem(productKey, productValue);
    
    // Lưu thông tin sản phẩm vào session
    sessionStorage.setItem(productKey, productValue);

    // Thực hiện gửi dữ liệu về server nếu cần thiết
    fetch('http://your-server-address/buy-now', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productKey,
        productName: productValue,
      }),
    }).then(response => {
      if (response.ok) {
        console.log("Product purchased successfully!");
        // Chuyển hướng tới trang thanh toán hoặc trang khác
        window.location.href = "/checkout";
      } else {
        console.error("Failed to purchase product.");
      }
    }).catch(error => {
      console.error("Error:", error);
    });
  };

  return (
    <>
      <Header /> 
      <div className="product">
        <div className="product-container">
          <div className="product-carousel">
            <div className="product-img">
              <img
                className="product-img"
                src="https://tnj.vn/15445-large_default/day-chuyen-bac-nu-trai-tim-doi-dcn0470.jpg"
                alt="img 1"
              />
              <img
                className="product-img"
                src="https://tnj.vn/13985-large_default/day-chuyen-bac-nu-trai-tim-doi-dcn0470.jpg"
                alt="img 2"
              />
              <img
                className="product-img"
                src="https://tnj.vn/13988-large_default/day-chuyen-bac-nu-trai-tim-doi-dcn0470.jpg"
                alt="img 3"
              />
              <img
                className="product-img"
                src="https://tnj.vn/13989-large_default/day-chuyen-bac-nu-trai-tim-doi-dcn0470.jpg"
                alt="img 4"
              />
            </div>
          </div>
          <div className="product-details">
            <h1 className="product-title">
              Dây chuyền bạc nữ mặt trái tim đôi DCN0470
            </h1>
            <div className="product-price">
              <span className="price-strike">466.000 ₫</span>
              <span className="price-current">329.000₫</span>
            </div>
            <div className="product-taxes">
              <p>Thuế:</p>
              <ul>
                <li>
                  Dây chuyền bạc nữ mặt trái tim đôi chất liệu bạc cao cấp 925
                </li>
                <li>Thiết kế tinh xảo trên công nghệ 3D tiên tiến</li>
                <li>
                  Bảo hành miễn phí trọn đời, đánh bóng làm mới hoặc rơi đá
                </li>
                <li>Kiểu dáng trẻ trung, thời trang</li>
              </ul>
            </div>
            <div className="product-quantity">
              <label htmlFor="quantity">Số lượng:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
              />
            </div>
            <div className="product-actions">
              <button className="add-to-cart" onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</button>
              <button className="buy-now" onClick={handleBuyNow}>MUA NGAY</button>
            </div>
          </div>
        </div>
        <div className="description">
          <div className="description-details">
            <h1 className="description-title">CHI TIẾT SẢN PHẨM</h1>
            <p className="description-reference">Tham chiếu DCN0470</p>
            <table className="description-table">
              <tbody>
                <tr>
                  <th>Mã sản phẩm</th>
                  <td>DCN0470</td>
                </tr>
                <tr>
                  <th>Thương hiệu</th>
                  <td>TNJ</td>
                </tr>
                <tr>
                  <th>Chất liệu</th>
                  <td>Đỉnh đá</td>
                </tr>
                <tr>
                  <th>Kiểu dáng</th>
                  <td>Bảo hành</td>
                </tr>
                <tr>
                  <th>Bạc 925</th>
                  <td>Nhân tạo Cubic zirconia trắng</td>
                </tr>
                <tr>
                  <th>Trái tim đôi</th>
                  <td>Miễn phí trọn đời đánh bóng làm mới hoặc rơi đá</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
