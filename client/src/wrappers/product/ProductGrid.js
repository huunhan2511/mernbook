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
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
