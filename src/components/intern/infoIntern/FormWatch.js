import React from "react";
import logo from "../../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { ROUTE_EDIT_PROFILE } from "../../../utils/routes";
function FormWatch() {
  return(
        <div className="form-watch">
            <h2>Intern's Profile</h2>
            <div className="form-watch__body">
                <div className="form-watch__body__info">
                    <div>
                        <img src={logo} className="avatar"/>
                    </div>  
                    <form>
                        <div className="info__name">
                            <label>Full name:</label>
                            <span>Phan Gia Sang</span>
                        </div>      
                        <div className="info__email">   
                            <label>Email:</label>  
                            <span>sang@gmail.com</span>
                        </div>
                        <div className="info__department">
                            <label>Department:</label>
                            <span>Dev</span>
                        </div>
                        <div className="info__sex">
                            <label id="sex">Sex:</label>
                            <span>Nam</span>
                        </div>
                        <div className="info__address">
                            <label>Address:</label>
                            <span>Hue</span>
                        </div>
                        <NavLink activeClassName="--active" to={ROUTE_EDIT_PROFILE}>
                            <button className="btn-edit">Edit Profile</button>
                        </NavLink>
                    </form>
                </div>
            </div>
        </div>
        
  );
}

export default FormWatch;
