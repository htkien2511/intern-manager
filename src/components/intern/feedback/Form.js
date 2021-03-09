import React from "react";
function Form() {
  return(
        <div className="form">
            <h1>Send Feedback</h1>
            <div className="form-feedback">
                <form>
                    <div className="title-feedback">
                        <label>Title:</label>
                        <input type="text" value="Phản hồi về bài tập khó" />  
                    </div>
                    <div className="content-feedback">
                        <label>Content:</label>
                        <textarea rows="10">chào sếp, ......................................</textarea>  
                    </div>
                    <center><button className="btn-send">Send</button></center> 
                </form>
            </div>    
        </div>
        
        
  );
}

export default Form;
