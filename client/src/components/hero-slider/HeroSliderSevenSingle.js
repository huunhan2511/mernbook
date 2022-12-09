import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { formatter } from "../../helpers/product";
const HeroSliderSevenSingle = ({ data, sliderClass, banner }) => {
  return (
    <div
      className={`single-slider-2 slider-height-18 d-flex align-items-center slider-overly-res ${
        sliderClass ? sliderClass : ""
      }`}
      style={{
        'backgroundImage': `url(http://localhost:3000/assets/img/banner/new-${banner}.png)`,
        'backgroundPosition': 'center', /* Center the image */
        'backgroundRepeat': 'no-repeat', /* Do not repeat the image */
        'backgroundSize': '700px 390px',
        'backgroundColor': '#cccccc'
      }}
    >
      <div className="slider-content-7 slider-animated-1 ml-70">
        <h3 className="animated">{data.name}</h3>
        <h1
          className="animated"
          dangerouslySetInnerHTML={{ __html: formatter.format(data.price) }}
        />
        <div className="slider-btn-9 btn-hover">
          <Link className="animated" to={'/product/'+ data._id}>
            Mua ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

HeroSliderSevenSingle.propTypes = {
  data: PropTypes.object,
  banner: PropTypes.number,
  sliderClass: PropTypes.string
};

export default HeroSliderSevenSingle;
