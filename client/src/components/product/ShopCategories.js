import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ShopCategories = ({ getSortParams }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const result = await axios("http://localhost:5000/category");
        setCategories(result.data);
    };
    fetchData();    
  }, []);
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Thể loại</h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("category", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> Tất cả thể loại
                </button>
              </div>
            </li>
            {categories && categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("category", category.name);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category.name}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopCategories;
