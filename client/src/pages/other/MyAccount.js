import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import {Card,Table} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import {useHistory} from "react-router-dom";
import CartDetail from "./CartDetail.js";

let headerTable = ["Mã đơn hàng","Trạng thái","Phương thức thanh toán","Chi tiết","Thanh toán"];
const MyAccount = ({ location }) => {
  let history = useHistory();
  const [flag,setFlag] = useState(true); 
  const [informations, setInformations] = useState();
  const [passwords, setPasswords] = useState();
  const [historyOrders,setHistoryOrders] = useState([])
  const handleEditFlag = () =>{
    if(flag){
      setFlag(false)
    }else{
      setFlag(true)
    }
  }
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
      if (results.data.Message==='Unauthorized.') {
        localStorage.removeItem('accessToken');
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại')
        history.push("/login-register")
      }
      setInformations(results.data);
    }).catch((err)=>{
      history.push("/login-register")
    });
  };
  const fetchHistoryOrders = async () =>{
      let token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:5000/accounts/orders",{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setHistoryOrders(response.data)
  }
  const handleRepayment = async (orderId) =>{
    let token = localStorage.getItem("accessToken");
    let response = await axios.post('http://localhost:5000/payment/re-payment',
        {
          id : orderId
        },
        {
          headers: {
          Authorization: `Bearer ${token}`,
          },
        }).catch((err)=>{
          alert('Máy chủ đăng gặp sự cố, vui lòng thử lại sau')
          return
        })
    let tab = window.open(response.data, "_blank", 'noopener,noreferrer')
    tab=null;
  }
  React.useEffect(() => {
    fetchInformation();
  },[]);
  React.useEffect(() =>{ 
    fetchHistoryOrders();
  },[flag]);
  
  const InfomationsChange = (event)=>{
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
  const handleInfomations = async (event) =>{
    event.preventDefault();
    let token = localStorage.getItem("accessToken");
    const response = await axios.patch("http://localhost:5000/accounts/information",
                    informations,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
    alert(response.data.Message);
  }
  
  const PasswordChange = (event)=>{
    const target = event.target;
    const name= target.name;
    const value = target.value;
    setPasswords((passwords)=>(
      {
        ...passwords,
        [name] : value
      }
    ))
  }
  const handleChangePassword = async (event) =>{
    event.preventDefault();
    let token = localStorage.getItem("accessToken");     
    if(passwords.newPassword !== passwords.reNewPassword) {
        alert('Vui lòng xác nhận mật khẩu mới');
    }
      else {
        const response = await axios.patch("http://localhost:5000/accounts/change-password", passwords,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        });
          alert(response.data.Message);
        }  
    } 
  const printStateOrder = (stateOrder) =>{
    switch(stateOrder){

        case "1" : {
            return <td style={{color : "#D7DF01", fontWeight: "bold"}}>Chờ xác nhận</td>  
        }
        case "2" : {
            return <td style={{color : "#FE8000", fontWeight: "bold"}}>Đang chuẩn bị hàng</td>  
        }
        case "3" : {
            return <td style={{color : "#0404B4", fontWeight: "bold"}}>Đang giao hàng</td>  
        }
        case "4" : {
            return <td style={{color : "#50C836", fontWeight: "bold"}}>Đơn hàng thành công </td>  
        }
        case "5" : {
            return <td style={{color : "#DF0101", fontWeight: "bold"}}>Đơn hàng bị hủy</td>
        }
        default : {
            break;
          }
    }
}

  return (
    <Fragment>
      <MetaTags>
        <title>Sagobo | Tài khoản của tôi</title>
        <meta
          name="description"
          content=""
        />
      </MetaTags>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">

                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Thông tin cá nhân{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        {informations && 
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Thông tin của tôi</h4>
                            </div>
                          <form onSubmit={(event) => handleInfomations(event)}>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Họ tên</label>
                                  <input
                                    type="text"
                                    name="fullname"
                                    onChange = {(event)=>InfomationsChange(event)}
                                    value={informations.fullname}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Số điện thoại</label>
                                  <input
                                    type="text"
                                    name="phone"
                                    onChange = {(event)=>InfomationsChange(event)}
                                    value={informations.phone}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Địa chỉ</label>
                                  <input
                                    type="text"
                                    name="address"
                                    onChange = {(event)=>InfomationsChange(event)}
                                    value={informations.address}
                                    required
                                    />
                                </div>
                              </div>
                            </div>

                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" >Cập nhật</button>
                              </div>
                            </div>
                            </form>

                          </div>
                          }
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    

                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Thay đổi mật khẩu
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Nhập mật khẩu mới</h4>
                            </div>
                            <form onSubmit={(event) => handleChangePassword(event)}>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu cũ</label>
                                  <input required
                                  type="password"
                                  name="oldPassword"
                                  onChange = {(event)=>PasswordChange(event)}
                                  />
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Mật khẩu mới</label>
                                  <input required
                                  type="password"
                                  name="newPassword"
                                  onChange = {(event)=>PasswordChange(event)}
                                  />
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Nhập lại Mật khẩu mới</label>
                                  <input required
                                  type="password"
                                  name="reNewPassword"
                                  onChange = {(event)=>PasswordChange(event)}
                                  />
                                </div>
                              </div>

                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Cập nhật</button>
                              </div>
                            </div>
                            </form>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span>Lịch sử đặt hàng{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper status-order">
                            <div className="cardTable table-wrapper-scroll-y my-custom-scrollbar pro-details-cart ">
                              <Table >
                                <thead>
                                    <tr>                  
                                    {headerTable.map((data,key)=>{
                                        return (
                                        <th key={key}>{data}</th>  
                                        );
                                    })}
                                    </tr>
                                </thead>
                                <tbody>
                                {historyOrders.map((order,key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{order._id}</td>
                                            {printStateOrder(order.status+"")}
                                            <td>{order.paymentMethod}</td>
                                            <td>
                                              <CartDetail id={order._id} handleEdit={handleEditFlag}/>
                                            </td> 
                                            <td>
                                              <button onClick = {()=>handleRepayment(order._id)}
                                                disabled = {
                                                            order.paymentMethod==="COD" || order.paymentMethod==="Online" && order.status!==1
                                                            ?
                                                            true
                                                            :
                                                            false
                                                          }
                                              >
                                                <i className="pe-7s-wallet"/> 
                                              </button>
                                            </td>
                                                         
                                        </tr>
                                    );
                                })}
                            </tbody>
                              </Table>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
