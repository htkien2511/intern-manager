import React from "react";
import logo from "../../../assets/images/logo.png";
function Chatting() {
  return(
        <div className="list">
            <h1>Title</h1>
            <h3>Date: 21/02/2021</h3>
            <div className="list_chat">
                <div className="list_chat_child">
                    <div>
                        <img src={logo} className="avatar"/>
                        <lable className="name">Me</lable>
                    </div>
                    <p>Sếp, ....................</p>
                </div>
                <div className="list_chat_child">
                    <div>
                        <img src={logo} className="avatar"/>
                        <lable className="name">Sep</lable>
                    </div>
                    <p>Me, ....................</p>
                </div>
            </div>
            <div className="message">
                <textarea rows="3" cols="95"></textarea>
                <button className="btn-send">Send</button>
            </div>
        </div>
        
        
  );
}

export default Chatting;
