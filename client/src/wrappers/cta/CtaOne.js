import PropTypes from "prop-types";
import React from "react";
const CtaOne = ({ spaceTopClass, backgroundImage }) => {
  return (
    <div className={`save-money-area ${spaceTopClass ? spaceTopClass : ""}`}>
      <div className="container">
          <div
            className="bg-img pt-100 pb-100"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL + backgroundImage})`
            }}
          >
          </div>
      </div>
    </div>
  );
};

CtaOne.propTypes = {
  backgroundImage: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default CtaOne;
