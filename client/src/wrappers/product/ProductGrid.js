import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { addToCart } from "../../redux/actions/cartActions";
import axios from 'axios';
const ProductGrid = ({
	  category,
  	cartItems,
  	sliderClassName,
  	spaceBottomClass
}) => {
    const [relatedProducts, setRelatedProducts] = useState();
    const fetchRelatedProducts = async () => {
		const result = await axios.get('https://sagobook.onrender.com/products/category/' + category)
		const data = result.data.products;
		setRelatedProducts(data);
	}
    React.useEffect(() => {
    	fetchRelatedProducts();
    },[]);

  return (
    <Fragment>
      {relatedProducts && relatedProducts.map(product => {
        return (
          <ProductGridSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            cartItem={
              cartItems.filter(cartItem => cartItem._id === product._id)[0]
            }            
            key={product._id}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  cartItems: PropTypes.array,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};



export default connect(mapStateToProps)(ProductGrid);
