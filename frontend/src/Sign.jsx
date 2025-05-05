import React, { useState } from "react";
import "./index2.css";

const Sign = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || (isSignUp && !formData.email)) {
      alert("All fields must be filled out");
      return;
    }
    if (!isSignUp && (formData.username !== "stanislaus.wirianto@binus.ac.id" || formData.password !== "2702342741")) {
      alert("Incorrect username or password");
      return;
    }
    onLogin(formData.username);
  };

  return (
    <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className={isSignUp ? "sign-up-form" : "sign-in-form"} onSubmit={handleSubmit}>
            <h2 className="title">{isSignUp ? "Sign Up" : "Log In"}</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
            </div>
            {isSignUp && (
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
              </div>
            )}
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button className="btn solid" type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Don't have an account?</h3>
            <button className="btn transparent" onClick={() => setIsSignUp(true)}>Sign Up</button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already have an account?</h3>
            <button className="btn transparent" onClick={() => setIsSignUp(false)}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
