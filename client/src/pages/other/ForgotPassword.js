import PropTypes from "prop-types";
import axios from "axios";
import React, { Fragment,useState} from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

const ForgotPassword = ({location}) => {
  const { pathname } = location;
  
  const [values,setValue] = useState();
  const inputChange = (event)=>{
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
  const handleSubmitEmail = async (event) =>{
      event.preventDefault();
      const response = await axios.post(process.env.REACT_APP_API_URL + "auth/reset-password",values)
      if(response.data.Error){
        alert(response.data.Error)
      }else{
        alert(response.data.Message)
      }
  }
  return (
    <Fragment>
      <MetaTags>
        <title>Quên mật khẩu</title>
        <meta
          name="description"
          content="Compare page of react app sagobook"
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Quên mật khẩu
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                        <h4>Quên mật khẩu </h4>
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={(event)=>handleSubmitEmail(event)}>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange = {(event)=>inputChange(event)}
                              />
                              
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                </div>
                                {/* {<Link>} */}
                                <button type="submit">
                                  <span>Gửi</span>
                                </button>
                                {/* {</Link>} */}
                              </div>
                            </form>
                          </div>
                        </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  location: PropTypes.object
};

export default ForgotPassword;
