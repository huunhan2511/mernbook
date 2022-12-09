import PropTypes from "prop-types";
import React from "react";

const LanguageCurrencyChanger = ({
  currency,
  changeCurrency,
  currentLanguageCode,
  dispatch
}) => {

  // const changeCurrencyTrigger = e => {
  //   const currencyName = e.target.value;
  //   changeCurrency(currencyName);
  // };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency">
        <p>Liên lạc 0123456789</p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  changeCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

export default LanguageCurrencyChanger;
