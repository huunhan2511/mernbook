import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQty, formatter } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
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
        {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + product.price}</span>{" "}
            <span className="old">
              {currency.currencySymbol + product.price}
            </span>
          </Fragment>
        ) : (
          <span>{formatter.format(product.price)} </span>
        )}
      </div>

      <div className="pro-details-list">
        {/* <p>{product.description}</p> */}
      </div>

      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
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
      )}

      {product.category.name ? (
        <div className="pro-details-meta">
          <span>Thể loại: </span>
          <Link to={process.env.PUBLIC_URL + "/products"}> {product.category.name} </Link>
        </div>
      ) : (
        ""
      )}

      {product.author.name ? (
        <div className="pro-details-meta">
          <span>Tác giả :</span>
          <Link to={process.env.PUBLIC_URL + "/products"}> {product.author.name} </Link>
        </div>
      ) : (
        ""
      )}

      {product.publisher.name ? (
        <div className="pro-details-meta">
          <span>Nhà xuất bản/Nhà phát hành :</span>
          <Link to={process.env.PUBLIC_URL + "/products"}> {product.publisher.name} </Link>
        </div>
      ) : (
        ""
      )}

      {/* {product.printLength ? (
        <div className="pro-details-meta">
          <span>Số trang: {product.printLength} </span>
        </div>
      ) : (
        ""
      )} */}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
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
