import PropTypes from "prop-types";
import { setActiveSort } from "../../helpers/product";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ShopAuthor = ({ getSortParams }) => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const result = await axios("http://localhost:5000/authors");
        setAuthors(result.data);
    };
    fetchData();    
  }, []);
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Tác giả</h4>
      <div className="sidebar-widget-list mt-20">
        {authors ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("author", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> Tất cả tác giả{" "}
                </button>
              </div>
            </li>
            {authors.map((author, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("author", author.name);
                        setActiveSort(e);
                      }}
                    >
                      <span className="checkmark" /> {author.name}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No authors found"
        )}
      </div>
    </div>
  );
};

ShopAuthor.propTypes = {
  authors: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopAuthor;
