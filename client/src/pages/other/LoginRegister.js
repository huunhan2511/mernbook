import PropTypes from "prop-types";
import axios from "axios";
import React, { Fragment,useState} from "react";
import MetaTags from "react-meta-tags";
import { Link,useHistory} from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
const LoginRegister = ({}) => {
  
  const [values,setValue] = useState();
  const [login, setLogin] = useState();
  const history = useHistory();
  const registerChange = (event)=>{
    const target = event.target;
    const name= target.name;
    const value = target.value;
      setValue((values)=>(
      {
        ...values,
        [name] : value
      }
    ))
  }
  const loginChange = (event)=>{
    const target = event.target;
    const name= target.name;
    const value = target.value;
      setLogin((login)=>(
      {
        ...login,
        [name] : value
      }
    ))
  }
  const handleRegister = async (event) =>{
    event.preventDefault();
    const response = await axios.post("https://sagobook.onrender.com/auth/register",values);
    if(response.data.Message === "Tạo tài khoản thành công"){
      alert(response.data.Message);    
    } else {
      alert(response.data.Message);
    }
  }
  const handleLogin = async (event) =>{
    event.preventDefault();
    const response = await axios.post("https://sagobook.onrender.com/auth/login",login);
    let message = response.data.Message;
    if (message) {
      //If login failed
      alert(message);
    } 
    else{
      //If login successfull 
      localStorage.setItem("accessToken",response.data.accessToken);
      history.push("/")     
    }
  }
  return (
    <Fragment>
      <MetaTags>
        <title>Đăng nhập | Đăng ký</title>
        <meta
          name="description"
          content="Compare page of react app sagobook"
        />
      </MetaTags>
     
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Đăng nhập</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Đăng ký</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={(event) => handleLogin(event)}>
                              <input
                                type="text"
                                name="username"
                                placeholder="Tài khoản"
                                onChange = {(event)=>loginChange(event)}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Mật khẩu"
                                onChange = {(event)=>loginChange(event)}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <Link to={process.env.PUBLIC_URL + "/forgotpassword"}>
                                    Quên mật khẩu?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Đăng nhập</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={(event)=>handleRegister(event)}>
                              <input
                                type="text"
                                name="username"
                                placeholder="Tài khoản"
                                onChange = {(event)=>registerChange(event)}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Mật khẩu"
                                onChange = {(event)=>registerChange(event)}
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                onChange = {(event)=>registerChange(event)}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Đăng ký</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
};

export default LoginRegister;
