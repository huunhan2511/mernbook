import React from 'react';
import { NavLink } from 'react-router-dom';

const index = (props) => {
    return(
        <div className="navLink">
            <NavLink activeClassName="selected" 
                        to={props.to}
                        activeStyle={{
                            background: "#007bff",
                            color : "white",
                            boxShadow: "#949DA5 0px 8px 24px",
                            border: "1px solid #007bff",
                            borderRadius: "5px"
                        }}
                        >
                            <i className={props.icon}></i>
                            {props.label}
            </NavLink> 
        </div>   
    );
};

export default index;