import React from "react";
function FormWatch() {
  return(
        <div className="form-watch">
            <h2>Information Intern</h2>
            <div className="form-watch__body">
                <div className="form-watch__body__info">
                    <h4>
                    Personal Information
                    </h4>
                    <form>
                        <div className="info__name">
                            <label>Full name:</label>
                            <input type="text" value="Phan Gia Sang" />
                        </div>
                        <div className="info__email"> 
                            <label>Email:</label>  
                            <input type="email" value="sang@gmail.com" />
                        </div>
                        <div className="info__phone">
                            <label>Phone:</label>
                            <input type="text" value="090534543" />  
                        </div>
                        <div className="info__sex">
                            <label id="sex">Sex:</label>
                            <input type="radio" name="gioitinh" value="Nam" />
                            <label>Male</label>
                            <input type="radio" name="gioitinh" value="Nữ" />
                            <label>Female</label>
                        </div>
                        <div className="info__address">
                            <label>Address:</label>
                            <input type="text" value="Huế" />
                        </div>
                    </form>
                </div>
                <div className="form-watch__body__account">
                    <h4>
                    Login Account
                    </h4>
                    <form>
                        <div className="account__username">
                            <label>Username:</label>
                            <input type="text" value="Phan Gia Sang" />
                        </div>
                        <div className="account__password">
                            <label>Password:</label>   
                            <input type="email" value="sang@gmail.com" />
                        </div>
                    </form>
                </div>
            </div>
            <button className="btn-edit">Update</button>
        </div>
        
  );
}

export default FormWatch;
