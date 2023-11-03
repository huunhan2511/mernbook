import React from 'react'
import { useHistory } from 'react-router';
import { useAuth } from '../../Context/AuthContext';
function Header(props) {
    const {handleLogout} = useAuth();
    return (
            <div className="header">
                <div className="header__title">
                    <h4>{props.title}</h4>
                </div>
                <div className="header__logOutAdmin">
                     <button onClick={handleLogout}>
                         <i className="fa fa-power-off"/>
                     </button>
                </div>
            </div>
   )
}
export default Header;
