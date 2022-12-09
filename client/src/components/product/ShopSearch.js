import React, {useState} from "react";
const ShopSearch = ({getSearchByKeyword}) => {
  const [input, setInput] = useState();
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Tìm kiếm </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="/">
          <input type="text" value={input} placeholder="Tìm kiếm..." 
            onChange={e => setInput(e.target.value)}
          />
          <button
            onClick={e => {
              e.preventDefault();
              getSearchByKeyword(input);
            }}
          >
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSearch;
