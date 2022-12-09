import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ShopPublisher = ({ getSortParams }) => {
  const [publishers, setPublishers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const result = await axios("http://localhost:5000/publishers");
        setPublishers(result.data);
    };
    fetchData();    
  }, []);
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Nhà xuất bản </h4>
      <div className="sidebar-widget-list mt-20">
        {publishers ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("publisher", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> Tất cả nhà xuất bản{" "}
                </button>
              </div>
            </li>
            {publishers.map((publisher, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className="text-uppercase"
                      onClick={e => {
                        getSortParams("publisher", publisher.name);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" />
                      {publisher.name}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No publishers found"
        )}
      </div>
    </div>
  );
};

ShopPublisher.propTypes = {
  getSortParams: PropTypes.func,
  publishers: PropTypes.array
};

export default ShopPublisher;
