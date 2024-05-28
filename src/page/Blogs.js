import React from "react";
import "../css/Blog.css";
import Header from "../conponent/Header";

const Blogs = () => {
  return (
    <>
      <Header />

      <div className="layout">
        <div className="layout1">
          <div className="container-blogs">
            <div className="item">
              <img
                src="https://product.hstatic.net/200000671715/product/2_c0539e94179b4d418235468eeb819b9d_1024x1024.jpg"
                alt="img 1"
              />
              <div className="content">
                <p className="date">07/05/2024</p>
                <a href="/news">
                  <h3>RÓT SEA MÊ VÀO TIM CÁC CÔ NÀNG VỚI TRANG SỨC CÁ TÍNH</h3>
                </a>

                <p>
                  "Rót mật ngọt vào tai em", thêm "SEA MÊ" vào tim các cô nàng
                  sành điệu, đừng quên cập nhật ngay
                </p>
              </div>
            </div>
            <div className="item">
              <img
                src="https://cf.shopee.vn/file/c6b4410e8d2ffd271c5b8abe0080ea41"
                alt="img 2"
              />
              <div className="content">
                <p className="date">02/05/2024</p>
                <h3>
                  NGUYÊN TẮC VÀNG KHI LỰA CHỌN TÍN VẬT ĐÍNH ƯỚC NGÀY CHUNG ĐÔI
                </h3>
                <p>
                  Để đánh dấu cho khởi đầu thiêng liêng của hành trình ấy, bên
                  cạnh những mẫu nhẫn cưới có thiết kế tối giản nhưng
                </p>
              </div>
            </div>
          </div>
          <div className="feed">
            <div className="item">
              <img
                src="https://mcdn.coolmate.me/uploads/February2022/ngay-8-3-nen-tang-gi-cho-vo-14.jpg"
                alt="img 5"
              />
              <div className="content">
                <p className="date">20/03/2024</p>
                <h3>
                  GỢI Ý QUÀ TẶNG RUNG RINH DÀNH CHO NHỮNG CÔ NÀNG CUNG BẠCH
                  DƯƠNG
                </h3>
                <p>
                  Là cung hoàng đạo thuộc nhóm Lửa, những cô nàng Bạch Dương
                  (21/03 - 19/04) được biết đến với tính cách mạnh
                </p>
              </div>
            </div>
            <div className="item">
              <img
                src="https://trangsuc.doji.vn/Upload/post-web-cu/pr-post-ngay-1-4/1.png"
                alt="img 3"
              />
              <div className="content">
                <p className="date">01/04/2024</p>
                <h3>TOP 3 ĐÁ PHONG THỦY CHO CÔ NÀNG CUNG BẠCH DƯƠNG</h3>
              </div>
            </div>
            <div className="item">
              <img
                src="https://forevermark.vn/wp-content/uploads/2023/06/vang-cuoi-24k-la-gi.jpg"
                alt="img 4"
              />
              <div className="content">
                <p className="date">25/03/2024</p>
                <h3>
                  VÌ SAO TRANG SỨC VÀNG 24K ĐƯỢC ƯA CHUỘNG TRONG CÁC DỊP CƯỚI
                  HỎI?
                </h3>
                <p>
                  Vượt qua mọi dòng chảy xu hướng với các thiết kế trang sức
                  thịnh hành hợp "mốt", trang sức vàng 24k cùng giá trị
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="layout2">
          <div className="sidebar">
            <div className="widget">
              <h3>SẢN PHẨM NỔI BẬT</h3>
              <ul>
                <li>
                  <a href="/">Earrings (Hoa tai)</a>
                </li>
                <li>
                  <a href="/">Rings (Nhẫn)</a>
                </li>
                <li>
                  <a href="/">Necklaces (Dây chuyền)</a>
                </li>
                <li>
                  <a href="/">Bracelets (Vòng tay)</a>
                </li>
              </ul>
            </div>
            <div className="widget">
              <h3>TAGS</h3>
              <ul className="a2">
                <li>
                  <a href="/">Care Guide</a>
                </li>
                <li>
                  <a href="/">Hướng dẫn bảo quản trang sức</a>
                </li>
                <li>
                  <a href="/">Hướng dẫn đo size</a>
                </li>
                <li>
                  <a href="/">Quà tặng bạn gái 20/10</a>
                </li>
                <li>
                  <a href="/">Quà tặng kỷ niệm tình yêu</a>
                </li>
                <li>
                  <a href="/">Size Guide</a>
                </li>
              </ul>
            </div>
            <div className="widget">
              <h3>TIN TỨC NỔI BẬT</h3>
              <ul>
                <li>
                  <a href="/">
                    TOP 6 các loại bạc và cách phân biệt loại bạc nào tốt nhất -
                    23/04/2024
                  </a>
                </li>
                <li>
                  <a href="/">
                    Tặng hoa 20/10 cho người yêu có ý nghĩa gì? - 11/04/2024
                  </a>
                </li>
                <li>
                  <a href="/">
                    Tặng quà sinh nhật cho bạn gái - Gợi ý 57 món quà ý nghĩa -
                    05/04/2024
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul className="pagination">
        <li className="disabled">
          <a href="/">&laquo;</a>
        </li>
        <li className="active">
          <a href="/">1</a>
        </li>
        <li>
          <a href="/">2</a>
        </li>
        <li>
          <a href="/">3</a>
        </li>
        <li>
          <a href="/">4</a>
        </li>
        <li>
          <a href="/">5</a>
        </li>
        <li>
          <a href="/">&raquo;</a>
        </li>
      </ul>
    </>
  );
};

export default Blogs;