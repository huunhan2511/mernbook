import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";

const ProductImageGallerySideThumb = ({ product, thumbPosition }) => {
  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loopedSlides: 5,
    loop: true,
    effect: "coverflow",
  };

  const thumbnailSwiperParams = {
    spaceBetween: 10,
    slidesPerView: 5,
    loopedSlides: 5,
    touchRatio: 1,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      1200: {
        slidesPerView: 4,
        direction: "vertical"
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      320: {
        slidesPerView: 4,
        direction: "horizontal"
      }
    }
  };

  return (
    <Fragment>
      <div className="row row-5">
        <div
          className={` ${
            thumbPosition && thumbPosition === "left"
              ? "col-xl-10 order-1 order-xl-2"
              : "col-xl-10"
          }`}
        >
          <div className="product-large-image-wrapper">
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.new ? <span className="purple">Mới</span> : ""}
              </div>
            ) : (
              ""
            )}
            <LightgalleryProvider>
              {product &&
              <Swiper {...gallerySwiperParams}>
                {
                  product.image.map((single, key) => {
                    return (
                      <div key={key}>
                        <LightgalleryItem
                          group="any"
                          src={process.env.PUBLIC_URL + single}
                        >
                          <button>
                            <i className="pe-7s-expand1"></i>
                          </button>
                        </LightgalleryItem>
                        <div className="single-image">
                          <img
                            src={process.env.PUBLIC_URL + single}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
              </Swiper>
            }
            </LightgalleryProvider>
          </div>
        </div>
        <div
          className={` ${
            thumbPosition && thumbPosition === "left"
              ? "col-xl-2 order-2 order-xl-1"
              : "col-xl-2"
          }`}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            <Swiper {...thumbnailSwiperParams}>
              {product.image &&
                product.image.map((single, key) => {
                  return (
                    <div key={key}>
                      <div className="single-image">
                        <img
                          src={process.env.PUBLIC_URL + single}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGallerySideThumb.propTypes = {
  product: PropTypes.object,
  thumbPosition: PropTypes.string
};

export default ProductImageGallerySideThumb;
