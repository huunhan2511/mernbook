import PropTypes from "prop-types";
import React from "react";
import SubscribeEmail from "./sub-components/SubscribeEmail";

const FooterNewsletter = ({ spaceBottomClass, spaceLeftClass, sideMenu }) => {
  return (
    <div
      className={`footer-widget ${spaceBottomClass ? spaceBottomClass : ""} ${
        sideMenu ? "ml-ntv5" : spaceLeftClass ? spaceLeftClass : ""
      }`}
    >
      <div className="footer-title">
        <h3>Đăng ký</h3>
      </div>
      <div className="subscribe-style">
        <p>Đăng ký để nhận những thông tin mới nhất và sớm nhất.</p>
        {/* subscribe email */}
        <SubscribeEmail mailchimpUrl="//xxxx.us13.list-manage.com/subscribe/post?u=zefzefzef&id=fnfgn" />
      </div>
    </div>
  );
};

FooterNewsletter.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string
};

export default FooterNewsletter;
