import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { formatter } from "../../helpers/product";
import { getDistrictByCity, getWardByDistrict } from "../../helpers/province";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import {useHistory} from "react-router-dom";
import provinces from "../../data/checkout/province.json";
import {clearAllFromCart} from "../../redux/actions/cartActions";
import { useToasts } from "react-toast-notifications";
const Checkout = ({ location, cartItems, currency, clearAllFromCart }) => {
  // Init
  let history = useHistory();
  const { addToast } = useToasts();
  let TotalPrice = 0;
  const fetchInformation = async (event) => {
    let token = localStorage.getItem("accessToken");
    await axios.get(
      "http://localhost:5000/accounts/information",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((results) => {
      setInformations(results.data);
    }).catch((err)=>{
      if (err.response.data.Message==='Unauthorized.') {
        localStorage.removeItem('accessToken');
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại')
        history.push("/login-register")
      }
      history.push("/login-register")
    });
  };
  // API
  const [informations, setInformations] = useState();
  const [voucher, setVoucher] = useState();
  const [discount, setDiscount] = useState(0);
  // Provinces process
  const [cities, setCities] = useState(provinces);
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();
  const [selectedCity, setSelectedCity] = useState(provinces[0].name);
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();
  //District changing
  React.useEffect(() => {
    fetchInformation();
    let districtOptions = getDistrictByCity(cities, selectedCity);
    let wardOptions = getWardByDistrict(districtOptions, selectedDistrict);
    setDistricts(districtOptions);
    setWards(wardOptions);
    setSelectedDistrict(districtOptions[0].name);
    setSelectedWard(wardOptions[0].name);
  },[selectedCity]);
  //District changing
  React.useEffect(() => {
    let districtOptions = getDistrictByCity(cities, selectedCity);
    let wardOptions = getWardByDistrict(districtOptions, selectedDistrict);
    setDistricts(districtOptions);
    setWards(wardOptions);
  },[selectedDistrict]);
  function onCitySelect(option) {
    let target = option.target;
    let value = target.value;
    setSelectedCity(value)
  }
  function onDistrictSelect(option) {
    let target = option.target;
    let value = target.value;
    setSelectedDistrict(value)
  }
  function onWardSelect(option) {
    let target = option.target;
    let value = target.value;
    setSelectedWard(value)
  }
  const onInfomationsChange = (event)=> {
    const target = event.target;
    const name= target.name;
    const value = target.value;
    setInformations((informations)=>(
      {
        ...informations,
        [name] : value
      }
    ))
  }
  const onVoucherChange = (event)=> {
    const target = event.target;
    const value = target.value;
    setVoucher((voucher)=>(value))
  }
  const handleVoucher = async (event) => {
    event.preventDefault();
    let token = localStorage.getItem("accessToken");
    const response = await axios.get('http://localhost:5000/vouchers/apply/'+voucher,
        {
          headers: {
          Authorization: `Bearer ${token}`,
          },
        });
    alert(response.data.Message);
    if (!response.data.isAvailable) {
      setDiscount(0);
      return
    }
    setDiscount(response.data.Discount);
  }
  const handleCOD = async (event) => {
    event.preventDefault();
    if (!informations.fullname || !informations.phone || !informations.address)
    {
      alert('Vui lòng nhập thông tin giao hàng')
      return
    }
    let token = localStorage.getItem("accessToken");
    let order = {
      "customer": informations.fullname,
      "phone": informations.phone,
      "address": informations.address+' '+selectedCity+' '+selectedDistrict+' '+selectedWard,
      "totalPrice": TotalPrice,
      "shipping": 0,
      "voucher": voucher,
      "grandTotal": (TotalPrice-discount),
      "paymentMethod": "COD",
      "note": informations.note,
      "cart": cartItems
    }
    console.log(order);
    let response = await axios.post('http://localhost:5000/orders',
        order,
        {
          headers: {
          Authorization: `Bearer ${token}`,
          },
        });
    if(response.data.isAvailable) {
      alert(response.data.Message);
      setVoucher((voucher)=>(null))
      setDiscount(0);
      return
    }
    clearAllFromCart(addToast)  
  }
  const handleOnline = async (event) =>{
    event.preventDefault();
    if (!informations.fullname || !informations.phone || !informations.address)
    {
      alert('Vui lòng nhập thông tin giao hàng')
      return
    }
    let token = localStorage.getItem("accessToken");
    let order = {
      "customer": informations.fullname,
      "phone": informations.phone,
      "address": informations.address,
      "totalPrice": TotalPrice,
      "shipping": 0,
      "voucher": voucher,
      "grandTotal": (TotalPrice-discount),
      "paymentMethod": "Online",
      "note": informations.note,
      "bankCode": "NCB",
      "cart": cartItems
    }
    let response = await axios.post('http://localhost:5000/orders',
        order,
        {
          headers: {
          Authorization: `Bearer ${token}`,
          },
        });
    if(response.data.isAvailable) {
      alert(response.data.Message);
      setVoucher((voucher)=>(null))
      setDiscount(0);
      return
    }
    clearAllFromCart(addToast);
    let newTab = window.open(response.data, "_blank", 'noopener,noreferrer')
    return newTab = null;
  }
  return (
    <Fragment>
      <MetaTags>
        <title>Sagobo | Thanh toán</title>
        <meta
          name="description"
          content=""
        />
      </MetaTags>
      
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          { informations &&
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              // <form onSubmit={(event) => handleCheckout(event)}>
                <div className="row">
                  {/* Checkout-LEFT */}
                  <div className="col-lg-7">
                    
                    <div className="billing-info-wrap">
                      <h3>Thông tin giao hàng</h3>
                        <div className="row">

                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Họ tên</label>
                              <input 
                                type="text" 
                                name="fullname"
                                // value={informations.fullname}
                                onChange = {(event)=>onInfomationsChange(event)}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Số điện thoại</label>
                              <input 
                                type="text"
                                name="phone"
                                onChange = {(event)=>onInfomationsChange(event)}
                                // value={informations.phone}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="billing-select mb-20">
                              <label>Tỉnh/Thành</label>
                              <select onChange={(option) => onCitySelect(option)}>
                                { cities && cities.map((value,key) => {
                                    return (
                                      <option key={key} value={value.name}>{value.name}</option>)
                                    })
                                }
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="billing-select mb-20">
                              <label>Quận/Huyện</label>
                              <select onChange={(option) => onDistrictSelect(option)}>
                                { districts && districts.map((value,key) => {
                                    return (
                                      <option key={key} value={value.name}>{value.name}</option>)
                                    })
                                }
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="billing-select mb-20">
                              <label>Phường/Xã</label>
                              <select onChange={(option) => onWardSelect(option)}>
                                { wards && wards.map((value,key) => {
                                  return (
                                    <option key={key} value={value.name}>{value.name}</option>)
                                  })
                                }
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Địa chỉ</label>
                              <input
                                className="billing-address"
                                placeholder="vd: 273 An Dương Vương"
                                type="text"
                                name="address"
                                onChange = {(event)=>onInfomationsChange(event)}
                                // value={informations.address}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="additional-info-wrap">
                          <h4>Ghi chú</h4>
                          <div className="additional-info">
                            <textarea
                              placeholder="Thêm ghi cho đơn hàng nếu cần thiết. "
                              name="note"
                              defaultValue={""}
                              onChange = {(event)=>onInfomationsChange(event)}
                            />
                          </div>
                        </div>                                
                    </div>
                  </div>
                  {/* Checkout-RIGHT */}
                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Hóa đơn</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Sản phẩm</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {                             
                                TotalPrice += cartItem.price * cartItem.quantity;
                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>{" "}
                                    <span className="order-price">
                                      {formatter.format(cartItem.price * cartItem.quantity)}
                                    </span>
                                  </li>
                                );
                              })                      
                              }                           
                            </ul>                          
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Phí vận chuyển</li>
                              <li>Miễn phí</li>
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Voucher giảm giá</li>
                              <li>- {formatter.format(discount)}</li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Tổng tiền</li>
                              <li>
                                {formatter.format(TotalPrice-discount)}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method"></div>
                      </div>

                      <div className="place-order mt-25">
                        <button 
                          className="btn-hover" 
                          // type="submit"
                          // onClick={(event) => handleCheckout(event)}
                          onClick={(event) => handleCOD(event)}
                        >Thanh toán COD</button>
                      </div>
                      <div className="place-order mt-10 ">
                        <button 
                          className="btn-hover" 
                          type="submit"
                          onClick={(event) => handleOnline(event)}
                        ><a href=""/>Thanh toán Online qua NCB</button>
                      </div>
                      <div className="mt-4">
                      <div className="discount-code-wrapper">
                        <div className="title-wrap">
                          <h4 className="cart-bottom-title section-bg-gray">
                            Sử dụng mã khuyến mãi
                          </h4>
                        </div>
                        <div className="discount-code">
                          <p>Hãy nhập mã khuyến mãi</p>
                          <form onSubmit={(event) => handleVoucher(event)}>
                            <input 
                              type="text"
                              name="voucher"
                              onChange={(event)=>onVoucherChange(event)}
                            />
                            <button 
                              className="cart-btn-2" 
                              type="submit"
                              onClick={(event) => handleVoucher(event)}
                            >
                              Sử dụng mã
                            </button>
                          </form>
                        </div>
                      </div>
                    </div> 
                      
                    </div>
                  </div>
                </div> 
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không có sản phẩm trong giỏ <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/products"}>
                        Mua sắm ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          }
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  removeFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearAllFromCart: addToast => {
      dispatch(clearAllFromCart(addToast));
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
