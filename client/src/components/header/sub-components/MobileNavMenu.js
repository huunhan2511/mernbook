import PropTypes from "prop-types";
import React from "react";
import { Link,useHistory } from "react-router-dom";

const MobileNavMenu = ({ strings }) => {
  const history = useHistory();

  const logout = () =>{
    localStorage.removeItem("accessToken");
    history.push("/login-register")
  }
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

        <li>
          <Link to={process.env.PUBLIC_URL + "/cart"}>
            Giỏ hàng
          </Link>
        </li>

        <li>
          {localStorage.getItem('accessToken') ? 
          <Link to={process.env.PUBLIC_URL + "/my-account"}>Trang của tôi</Link>
          :
          <Link to={process.env.PUBLIC_URL + "/login-register"}>Đăng nhập/ Đăng ký</Link>  
          }
        </li>
        {
        localStorage.getItem('accessToken') 
        ?
        <li >
          <a href="#" onClick={logout}>
            Đăng xuất
          </a>
        </li>
        :
        <li></li>
        }
      </ul>
      
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default MobileNavMenu;
