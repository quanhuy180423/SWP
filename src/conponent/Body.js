import React, { useEffect } from "react";
// import "../css/body.css";

const Body = () => {
  useEffect(() => {
    const carousel = document.querySelector(".carousel");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    let currentIndex = 0;

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = carouselItems.length - 1; // Nếu index nhỏ hơn 0, đặt lại index cho slide cuối cùng
      } else if (index >= carouselItems.length) {
        currentIndex = 0; // Nếu index vượt quá số lượng slides, đặt lại index cho slide đầu tiên
      } else {
        currentIndex = index;
      }
      const offset = -currentIndex * carouselItems[0].offsetWidth;
      carousel.style.transform = `translateX(${offset}px)`;
    }

    function goToNextSlide() {
      goToSlide(currentIndex + 1);
    }

    function goToPrevSlide() {
      goToSlide(currentIndex - 1);
    }

    nextButton.addEventListener("click", goToNextSlide);
    prevButton.addEventListener("click", goToPrevSlide);

    const interval = setInterval(goToNextSlide, 5000); // Chuyển slide mỗi 5 giây

    // Cleanup function
    return () => {
      nextButton.removeEventListener("click", goToNextSlide);
      prevButton.removeEventListener("click", goToPrevSlide);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="body min-h-screen bg-gray-100">
      <div>
        <div className="banner flex justify-center items-center">
          <div className="carousel-container  relative overflow-hidden">
            <div className="carousel flex transition-transform duration-500 ease-in-out">
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
            <button className="prev-button absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-500 text-white py-2 px-3 rounded-full">
              &#10094;
            </button>
            <button className="next-button absolute top-1/2 transform -translate-y-1/2 right-0 bg-gray-500 text-white py-2 px-3 rounded-full">
              &#10095;
            </button>
          </div>
        </div>
      </div>

      <div className="products flex justify-center items-center">
        <div className="product-list w-3/4 flex justify-center items-center">
          <div className="product w-1/4 border-2 border-gray-300 m-5">
            <a href="/">
              <img
                src="./img/product1.jpg"
                alt="product1"
                className="w-full h-auto"
              />
            </a>
            <ul className="product-shot-info flex justify-between items-center p-2">
              <li>Vàng 24k</li>
              <li>|</li>
              <li>NM70</li>
            </ul>
            <a href="/product" className="block text-center p-2">
              <h4>Nhẫn Cưới Sapphire Xanh NM70</h4>
            </a>
            <span className="block text-center p-2">Giá tiền: </span>
          </div>

          <div className="product w-1/4 border-2 border-gray-300 m-5">
            <a href="/">
              <img
                src="./img/product2.jpg"
                alt="product2"
                className="w-full h-auto"
              />
            </a>
            <ul className="product-shot-info flex justify-between items-center p-2">
              <li>Vàng 18k</li>
              <li>|</li>
              <li>NC65</li>
            </ul>
            <a href="/product" className="block text-center p-2">
              <h4>Nhẫn Cưới Vintage Vàng 2 Màu NC65</h4>
            </a>
            <span className="block text-center p-2">Giá tiền: </span>
          </div>

          <div className="product w-1/4 border-2 border-gray-300 m-5">
            <a href="/">
              <img
                src="./img/product3.jpg"
                alt="product3"
                className="w-full h-auto"
              />
            </a>
            <ul className="product-shot-info flex justify-between items-center p-2">
              <li>Vàng 18k</li>
              <li>|</li>
              <li>NC68</li>
            </ul>
            <a href="/product" className="block text-center p-2">
              <h4>Nhẫn Cưới Vintage Vàng 2 Màu NC68</h4>
            </a>
            <span className="block text-center p-2">Giá tiền: </span>
          </div>

          <div className="product w-1/4 border-2 border-gray-300 m-5">
            <a href="/">
              <img
                src="./img/product4.jpg"
                alt="product4"
                className="w-full h-auto"
              />
            </a>
            <ul className="product-shot-info flex justify-between items-center p-2">
              <li>Vàng hồng 18k</li>
              <li>|</li>
              <li>NC67</li>
            </ul>
            <a href="/product" className="block text-center p-2">
              <h4>Nhẫn Cưới Vàng Hồng Kim Cương NC67</h4>
            </a>
            <span className="block text-center p-2">Giá tiền: </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
