import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
  cartItems,
}) => {
  const { addToast } = useToasts();
    
  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            {galleryType === "leftThumb" ? 
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
              />
            :
              <ProductImageGallerySideThumb product={product} thumbPosition="right" />
            }
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              cartItems={cartItems}
              addToast={addToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  spaceTopClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  cartItems: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
