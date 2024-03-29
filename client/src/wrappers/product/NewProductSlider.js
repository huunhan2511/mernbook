import PropTypes from "prop-types";
import React from "react";
import Swiper from "react-id-swiper";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridTwo from "./ProductGridTwo";

const NewProductSlider = ({
  spaceTopClass,
  spaceBottomClass,
  limit
}) => {
  const settings = {
    loop: false,
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 3
      },
      640: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      }
    }
  };

  return (
    <div
      className={`new-product-area ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${spaceTopClass ? spaceTopClass : ""}`}
    >
      <div className="container">
        <SectionTitle
          titleText="Sản phẩm mới"
          positionClass="text-center"
          spaceClass="mb-60"
        />
        <div className="row">
          <Swiper {...settings}>
            <ProductGridTwo
              limit={limit}
              sliderClassName="swiper-slide"
              type="newArrival"
            />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

NewProductSlider.propTypes = {
  limit: PropTypes.number,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default NewProductSlider;
