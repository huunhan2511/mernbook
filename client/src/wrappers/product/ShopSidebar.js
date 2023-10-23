import PropTypes from "prop-types";
import React from "react";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopAuthor from "../../components/product/ShopAuthor";
import ShopPublisher from "../../components/product/ShopPublisher";
// import ShopTag from "../../components/product/ShopTag";

const ShopSidebar = ({ getSortParams, sideSpaceClass, getSearchByKeyword }) => {

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch getSearchByKeyword={getSearchByKeyword} />

      {/* filter by categories */}
      <ShopCategories
        // categories={uniqueCategories}
        getSortParams={getSortParams}
      />

      {/* filter by authors */}
      <ShopAuthor getSortParams={getSortParams} />

      {/* filter by publisher
       */}
      <ShopPublisher getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
};

export default ShopSidebar;
