import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
function FormEdit() {
    const [imageUrl, setImageUrl]=useState(logo);
    return(
        <div className="form-watch">
            <h2>Edit Profile</h2>
            <div className="form-watch__body">
                <div className="form-watch__body__info">
                    <div className="edit-avatar">
                        <img src={imageUrl} className="avatar" alt="avatar"/>
                        <div className="file flex items-center">
                            <input type="file" name="file" id="file" class="inputfile" onChange={(event)=>{setImageUrl(URL.createObjectURL(event.target.files[0]))}}/>
                            <label for="file">Choose a file</label>
                        </div>
                    </div>  
                    <form className="form__edit">
                        <div className="info__name">
                            <label>Full name:</label>
                            <input type="text" value="Phan Gia Sang"/>
                        </div>  
                        <div className="info__email">   
                            <label>Email:</label>  
                            <input type="text" value="Phan Gia Sang" />
                        </div>
                        <div className="info__department">
                            <label>Department:</label>
                            <input type="text" value="Phan Gia Sang"/>
                        </div>
                        <div className="info__sex">
                            <label id="title">Sex:</label>
                            <input type="radio" name="sex"/>
                            <span>Male</span>
                            <input type="radio" name="sex"/>
                            <span>Female</span>
                        </div>
                        <div className="info__address">
                            <label>Address:</label>
                            <input type="text" value="Phan Gia Sang"/>
                        </div>
                        <p>Change Password</p>
                        <div className="current__pass">
                            <label>Current Password:</label>
                            <input type="password" placeholder="*******"/>
                        </div>
                        <div className="new__pass">
                            <label>New Password:</label>
                            <input type="password" placeholder="*******"/>
                        </div>
                        <div className="confirm_pass">
                            <label>Confirm Password:</label>
                            <input type="password" placeholder="*******"/>
                        </div>
                        <button className="btn-edit">Save</button>
                    </form>
                </div>
            </div>
        </div>
        
  );
}

export default FormEdit;
