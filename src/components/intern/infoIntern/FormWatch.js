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
                        <img src={logo} className="avatar" alt="avatar"/>
                    </div>  
                    <form>
                        <div className="info__name">
                            <label>Full name:</label>
                            <p>Phan Gia Sang</p>
                        </div>      
                        <div className="info__email">   
                            <label>Email:</label>  
                            <p>sang@gmail.com</p>
                        </div>
                        <div className="info__department">
                            <label>Department:</label>
                            <p>Dev</p>
                        </div>
                        <div className="info__sex">
                            <label id="sex">Gender:</label>
                            <p>Male</p>
                        </div>
                        <div className="info__address">
                            <label>Address:</label>
                            <p>Hue</p>
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
