import PropTypes from "prop-types";
import React, { useState } from "react";
import axios from 'axios';
const CtaOne = ({ spaceTopClass, backgroundImage }) => {
  const [product, setProduct] = useState();
  const fetchData = async () => {
        let results = await axios.get('https://sagobook.onrender.com/');
        results = results.data;
        setProduct(results.new);            
  };
  React.useEffect(() => {
    fetchData();
  },[]);
  return (
    <div className={`save-money-area ${spaceTopClass ? spaceTopClass : ""}`}>
      <div className="container">
        { product && 
          <div
            className="bg-img pt-100 pb-100"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL + backgroundImage})`
            }}
          >
          </div>
        }
      </div>
    </div>
  );
};

CtaOne.propTypes = {
  backgroundImage: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default CtaOne;
