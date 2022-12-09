import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";
import { addToCart } from "../../redux/actions/cartActions";
import axios from 'axios';
const ProductGridTwo = ({
  type,
  currency,
  addToCart,
  cartItems,
  sliderClassName,
  spaceBottomClass
}) => {
  const [products, setProducts] = useState();
  const fetchData = async () => {
        let results = await axios.get('http://localhost:5000/');
        results = results.data;
        switch(type) {
          case 'newArrival':
            setProducts(results.new);
            break;
          case 'highlights':
            setProducts(results.hot);
            break;
          default:
            break;
        }              
  };
  React.useEffect(() => {
    fetchData();
  },[]);
  return (
    <Fragment>
      {products && products.slice(0, 4).map(product => {
        return (
          <ProductGridSingleTwo
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            addToCart={addToCart}
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

ProductGridTwo.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    products: getProducts(
      state.productData.products,
      ownProps.category,
      ownProps.type,
      ownProps.limit
    ),
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridTwo);
