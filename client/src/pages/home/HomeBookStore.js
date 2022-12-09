import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutTwo from "../../layouts/LayoutTwo";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import SliderBanner from "../../wrappers/slider-banner/SliderBanner";
import TabProductFour from "../../wrappers/product/TabProductFour";
import CtaOne from "../../wrappers/cta/CtaOne";
import NewProductSlider from "../../wrappers/product/NewProductSlider";
import BrandLogoSliderTwo from "../../wrappers/brand-logo/BrandLogoSliderTwo";

const HomeBookStore = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Sagobo | Book Store</title>
        <meta
          name="description"
          content=""
        />
      </MetaTags>
      
      <LayoutTwo>
        {/* slider banner */}
        <SliderBanner />
        {/* feature icon */}
        <FeatureIconFour
          spaceBottomClass="pb-70"
          containerClass="container"
          responsiveClass="res-mrg-md-mt"
        />
        {/* tab product */}
        <TabProductFour productTabClass="product-tab-pink2" />
        {/* call to action */}
        <CtaOne
          spaceTopClass="pt-100"
          backgroundImage="assets/img/banner/single.png"
        />
        {/* new product slider */}
        <NewProductSlider
          spaceTopClass="pt-100"
          spaceBottomClass="pb-95"
          type="newArrival"
          limit={6}
        />
        {/* brand logo slider */}
        <BrandLogoSliderTwo />
      </LayoutTwo>
    </Fragment>
  );
};

export default HomeBookStore;
