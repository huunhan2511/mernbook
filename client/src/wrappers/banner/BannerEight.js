import React, { useState } from "react";
import BannerEightSingle from "../../components/banner/BannerEightSingle.js";
import axios from 'axios';

const BannerEight = () => {
  const [products, setProducts] = useState();
  const fetchData = async () => {
        let results = await axios.get('http://localhost:5000/');
        results = results.data;
        setProducts(results.hot);            
  };
  React.useEffect(() => {
    fetchData();
  },[]);
  return (
    <div className="col-lg-4 col-md-12">
      <div className="row">
        {products &&
          products.slice(0,2).map((single, key) => {
            return (
              <BannerEightSingle
                data={single}
                banner={key}
                key={key}
                spaceBottomClass="mb-30"
              />
            );
          })}
      </div>
    </div>
  );
};

export default BannerEight;
