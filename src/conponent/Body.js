import React, { useEffect } from "react";
// import { initializeCarousel } from "./CarouselForBody";
import "../css/body.css";

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
    <>
      <div>
        <div class="banner">
          <div class="carousel-container">
            <div class="carousel">
              <div class="carousel-item">
                <img src="./img/banner1.png" alt="img 1" />
              </div>
              <div class="carousel-item">
                <img src="./img/banner2.png" alt="img 2" />
              </div>
              <div class="carousel-item">
                <img src="./img/banner3.png" alt="img 3" />
              </div>
              <div class="carousel-item">
                <img src="./img/banner4.png" alt="img 4" />
              </div>
            </div>
            <button class="prev-button">&#10094;</button>
            <button class="next-button">&#10095;</button>
          </div>
        </div>

        <div class="products">
          <div class="product-list">
            <div class="product">
              <a href="/">
                <img src="./img/product1.jpg" alt="product1" />
              </a>
              <ul class="product-shot-info">
                <li>Vàng 24k</li>
                <li>|</li>
                <li>NM70</li>
              </ul>
              <a href="/">
                <h4>Nhẫn Cưới Sapphire Xanh NM70</h4>
              </a>
              <span>Giá tiền: </span>
            </div>

            <div class="product">
              <a href="/">
                <img src="./img/product2.jpg" alt="product2" />
              </a>
              <ul class="product-shot-info">
                <li>Vàng 18k</li>
                <li>|</li>
                <li>NC65</li>
              </ul>
              <a href="/">
                <h4>Nhẫn Cưới Vintage Vàng 2 Màu NC65</h4>
              </a>
              <span>Giá tiền: </span>
            </div>

            <div class="product">
              <a href="/">
                <img src="./img/product3.jpg" alt="product3" />
              </a>
              <ul class="product-shot-info">
                <li>Vàng 18k</li>
                <li>|</li>
                <li>NC68</li>
              </ul>
              <a href="/">
                <h4>Nhẫn Cưới Vintage Vàng 2 Màu NC68</h4>
              </a>
              <span>Giá tiền: </span>
            </div>

            <div class="product">
              <a href="/">
                <img src="./img/product4.jpg" alt="product4" />
              </a>
              <ul class="product-shot-info">
                <li>Vàng hồng 18k</li>
                <li>|</li>
                <li>NC67</li>
              </ul>
              <a href="/">
                <h4>Nhẫn Cưới Vàng Hồng Kim Cương NC67</h4>
              </a>
              <span>Giá tiền: </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
