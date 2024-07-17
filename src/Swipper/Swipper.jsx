import React from 'react';
import PropTypes from 'prop-types';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Swipper = ({ images = [] }) => {
    if (!Array.isArray(images)) {
        console.error("Expected 'images' to be an array but received", typeof images);
        return null;
    }

    return (
        <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {images.map((src, index) => (
                <SwiperSlide key={index}>
                    <img src={src} alt={`Product ${index + 1}`} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

// Swipper.propTypes = {
//     images: PropTypes.arrayOf(PropTypes.string)
// };

// Swipper.defaultProps = {
//     images: []
// };

export default Swipper;
