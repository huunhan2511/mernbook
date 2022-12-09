import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { formatter } from "../../helpers/product";

const BannerEightSingle = ({ data, banner, spaceBottomClass }) => {
  return (
    <div className="col-lg-12 col-md-6 col-sm-6">
      <div
        className={`single-banner ${spaceBottomClass ? spaceBottomClass : ""}`}        
      >
        <Link to={'/product/'+ data._id}>
        <img src={process.env.PUBLIC_URL + `/assets/img/banner/banner-${banner}.png`} alt="" />
        </Link>
        <div className="banner-content banner-pink">
          <h3>{data.name}</h3>
          <h4>
            <span>{formatter.format(data.price)}</span>
          </h4>
          <Link to={'/product/'+ data._id}>
            <i className="fa fa-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

BannerEightSingle.propTypes = {
  data: PropTypes.object,
  banner : PropTypes.number,
  spaceBottomClass: PropTypes.string
};

export default BannerEightSingle;
