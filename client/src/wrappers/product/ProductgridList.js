import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";

const ProductGrid = ({
  products,
  sliderClassName,
  spaceBottomClass
}) => {
  return (
    <Fragment>
      {products && products.map(product => {
        return (
          <ProductGridListSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            key={product._id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGrid;
