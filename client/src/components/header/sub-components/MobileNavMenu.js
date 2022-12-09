import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const MobileNavMenu = ({ strings }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/"}>Trang chủ</Link>
        </li>

        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/products"}>
            Sản phẩm
          </Link>
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>
            Về chúng tôi
          </Link>
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            Liên hệ
          </Link>
        </li>

      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default MobileNavMenu;
