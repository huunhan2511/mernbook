import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import axios from 'axios';
const ProductTabLeft = ({ location }) => {
  let { id } = useParams(); 
  const { pathname } = location;
  const [product, setProduct] = useState();
  const fetchData = async () => {
        const result = await axios.get(process.env.REACT_APP_API_URL+"products/"+id);
        const data = result.data;
        setProduct(data);
  };

  React.useEffect(() => {
    fetchData();
  },[]);
  
  return (
    <Fragment>
      <MetaTags>
        <title>Sagobo | Sản phẩm</title>
        <meta
          name="description"
          content=""
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/products"}>Sản phẩm</BreadcrumbsItem>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Chi tiết sản phẩm
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        {/* product description with image */}
        {product && <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
          galleryType="rightThumb"
        />}

        {/* product description tab */}
        {product && <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.description}
          productPrintLength={product.printLength}
          productID={product._id}
        />}

        {/* related product slider */}
        {product && <RelatedProductSlider
          	spaceBottomClass="pb-95"
			      category={product.category._id}
        />}
      </LayoutOne>
    </Fragment>
  );
};

ProductTabLeft.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
};

export default connect(mapStateToProps)(ProductTabLeft);
