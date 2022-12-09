import PropTypes from "prop-types";
import React from "react";
import { Link,useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromCart } from "../../redux/actions/cartActions";

const IconGroup = ({
  currency,
  cartData,
  iconWhiteClass
}) => {
  const history = useHistory();
  // const handleClick = e => {
  //   e.currentTarget.nextSibling.classList.toggle("active");
  // };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const logout = () =>{
    localStorage.removeItem("accessToken");
    history.push("/login-register")
  }
  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >

      <div className="same-style account-setting d-none d-lg-block">
        <button>
          {localStorage.getItem('accessToken') ? 
          <Link to={process.env.PUBLIC_URL + "/my-account"}><i className="pe-7s-user" /></Link>
          :
          <Link to={process.env.PUBLIC_URL + "/login-register"}><i className="pe-7s-user" /></Link>  
          }
        </button>
      </div>
      
        {
        localStorage.getItem('accessToken') 
        ?
        <div className="same-style logout d-none d-lg-block">
          <button onClick={logout}>
            <i className="pe-7s-power"></i>
          </button>
        </div>
        :
        <div></div>
        }
        
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart">
          <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
          </Link>
        </button>
      </div>

      

      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
      
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  //removeFromCart: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
