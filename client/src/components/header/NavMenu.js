import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";


const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              Trang chủ
            </Link>
          </li>
      
          <li>
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
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default NavMenu;
