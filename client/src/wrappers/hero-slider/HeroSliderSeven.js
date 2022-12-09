import React, { useState } from "react";
import Swiper from "react-id-swiper";
import HeroSliderSevenSingle from "../../components/hero-slider/HeroSliderSevenSingle.js";
import axios from 'axios';
const HeroSliderSeven = () => {
  const params = {
    grabCursor: true,
    effect: "coverflow",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )  
  };
  const [products, setProducts] = useState();
  const fetchData = async () => {
        let results = await axios.get('http://localhost:5000/');
        results = results.data;
        setProducts(results.new);            
  };
  React.useEffect(() => {
    fetchData();
  },[]);
  return (
    <div className="slider-area res-mrg-md-mb">
      <div className="slider-active-3">       
          { products &&
            <Swiper {...params}>
              {
                products.map((single, key) => {
                return (
                <HeroSliderSevenSingle
                  data={single}
                  banner={key}
                  key={key}
                  sliderClass="swiper-slide"
                />
                );})
              }
            </Swiper>
          }
      </div>
    </div>
  );
};

export default HeroSliderSeven;
