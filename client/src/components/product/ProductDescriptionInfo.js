import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQty, formatter } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";

const ProductDescriptionInfo = ({
  product,
  cartItems,
  addToast,
  addToCart,
}) => {
  const [productStock, setProductStock] = useState(
    product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQty(
    cartItems,
    product,
  );
  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
          <span>{formatter.format(product.price)} </span>
      </div>
      
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < productStock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>

          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={() =>
                  addToCart(
                    product,
                    addToast,
                    quantityCount,
                  )
                }
                disabled={productCartQty >= productStock}
              >
                {" "}
                Thêm vào giỏ{" "}
              </button>
            ) : (
              <button disabled>Hết hàng</button>
            )}
          </div>

        </div>
      

      {product.category.name ? (
        <div className="pro-details-meta">
          <span>Thể loại: </span>
          {product.category.name}
        </div>
      ) : (
        ""
      )}

      {product.author.name ? (
        <div className="pro-details-meta">
          <span>Tác giả :</span>
          {product.author.name}
        </div>
      ) : (
        ""
      )}

      {product.publisher.name ? (
        <div className="pro-details-meta">
          <span>Nhà xuất bản/Nhà phát hành :</span>
          {product.publisher.name}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  product: PropTypes.object,
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
    }
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
