import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";


const MobileLangCurrChange = ({
  currency,
  changeCurrency,
}) => {

  const changeCurrencyTrigger = e => {
    const currencyName = e.target.value;
    changeCurrency(currencyName);
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.remove("active");
  };

  return (
    <div className="mobile-menu-middle">
      <div className="lang-curr-style">
        <span className="title mb-2">Choose Currency</span>
      </div>
    </div>
  );
};

MobileLangCurrChange.propTypes = {
  changeCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileLangCurrChange);
