import React from 'react'
import { useHistory } from 'react-router';
function Header(props) {
    const history = useHistory();
    const logout = () =>{
        localStorage.removeItem("accessToken");
        history.push("/Admin")
        window.location.reload();
    }
    return (
            <div className="header">
                <div className="header__title">
                    <h4>{props.title}</h4>
                </div>
                <div className="header__logOutAdmin">
                     <button onClick={logout}>
                         <i className="fa fa-power-off"/>
                     </button>
                </div>
            </div>
   )
}
export default Header;
