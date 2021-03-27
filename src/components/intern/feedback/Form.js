import React from "react";
import { isEmpty } from "validator";
function Form() {
  const [errorSendFeedback, setSendFeedback] = React.useState();
  const [error, setError] = React.useState({});
  const [form, setForm] = React.useState({
    title: "",
    content: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.title)) {
      errorState.title = "Please enter title";
    }
    if (isEmpty(form.content)) {
      errorState.content = "Please enter content";
    }
    return errorState;
  };
  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
    setSendFeedback("");
  };
  return (
    <div className="send-feedback">
      <div>
        <h1>Send Feedback</h1>
      </div>
      <div className="form">
        <div className="error">{errorSendFeedback}</div>
        <div className="info__contact">
          <h3>Contact Information</h3>
          <div>
            <i className="fi-rr-marker"></i>
            <span className="">
              Jl. Dr. Ir Soekarno No.16 - 17 Street , Roadblock, West County
            </span>
          </div>
          <div>
          <i className="fi-rr-envelope"></i>
            <span className="">info@funclub.com</span>
          </div>
          <div>
          <i className="fi-rr-smartphone"></i>
            <span className=""> 012 123 3456 6789</span>
          </div>
        </div>
        <div className="form-feedback">
          <form onSubmit={handleSubmit}>
            <div className="title-feedback">
              <label>Title:</label>
              <input
                type="text"
                value={form.title}
                name="title"
                placeholder="Title"
                onChange={handleChange}
                onFocus={handleFocus}
              />
              {error.title && (
                <span className="error__editProfile">{error.title}</span>
              )}
            </div>
            <div className="content-feedback">
              <label>Content:</label>
              <textarea
                rows="10"
                value={form.content}
                name="content"
                placeholder="Content"
                onChange={handleChange}
                onFocus={handleFocus}
              />
              {error.content && (
                <span className="error__editProfile">{error.content}</span>
              )}
            </div>
            <center>
              <button className="btn-send">Send</button>
              {/* disabled={isEmpty(form.title) && isEmpty(form.content)} */}
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
