import React from "react";
import '../css/Product.css';

const Product = () => {
  return (
    <>
      <div class="product">
        <div class="product-container">
          <div class="product-carousel">
            <div class="product-img">
              <img
                class="product-img"
                src="https://tnj.vn/15445-large_default/day-chuyen-bac-nu-trai-tim-doi-dcn0470.jpg"
                alt="img 1"
              />
              <img
                class="product-img"
                src="https://tnj.vn/13985-large_default/day-chuyen-bac-nu-trai-tim-doi-dcn0470.jpg"
                alt="img 2"
              />
              <img
                class="product-img"
                src="https://tnj.vn/13988-large_default/day-chuyen-bac-nu-trai-tim-doi-dcn0470.jpg"
                alt="img 3"
              />
              <img
                class="product-img"
                src="https://tnj.vn/13989-large_default/day-chuyen-bac-nu-trai-tim-doi-dcn0470.jpg"
                alt="img 4"
              />
            </div>
          </div>
          <div class="product-details">
            <h1 class="product-title">
              Dây chuyền bạc nữ mặt trái tim đôi DCN0470
            </h1>

            <div class="product-price">
              <span class="price-strike">466.000 ₫</span>
              <span class="price-current">329.000₫</span>
            </div>
            <div class="product-taxes">
              <p>Thuế:</p>
              <ul>
                <li>
                  Dây chuyền bạc nữ mặt trái tim đôi chất liệu bạc cao cấp 925
                </li>
                <li>Thiết kế tinh xảo trên công nghệ 3D tiên tiến</li>
                <li>
                  Bảo hành miễn phí trọn đời, đánh bóng làm mới hoặc rơi đá
                </li>
                <ki>Kiểu dáng trẻ trung, thời trang</ki>
              </ul>
            </div>
            <div class="product-quantity">
              <label for="quantity">Số lượng:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value="1"
              />
            </div>
            <div class="product-actions">
              <button class="add-to-cart">THÊM VÀO GIỎ HÀNG</button>
              <button class="buy-now">MUA NGAY</button>
            </div>
          </div>
        </div>
        <div class="description">
          <div class="desription-details">
            <h1 class="discription-title">CHI TIẾT SẢN PHẨM</h1>
            <p class="discription-reference">Tham chiếu DCN0470</p>
            <table class="discription-table">
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
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
