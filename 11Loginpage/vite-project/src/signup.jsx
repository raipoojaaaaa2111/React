import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
const handleSubmit = async (e) => {
  e.preventDefault();

  // Check whether passwords match
  if (password !== confirmPassword) {
    alert("Password and Confirm Password do not match");
    return;
  }

  try {
    // Send signup data to backend
    const response = await fetch("http://localhost:8800/signup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    // Get response from backend
    const data = await response.json();

    console.log("Backend response:", data);

    if (response.ok) {
      navigate("/login", { state: { message: "Account created. Log in to continue." } });
    } else {
      alert(data.message || "Signup failed");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Could not connect to the backend");
  }
};



    return (
      <div className="signup-container">
        <div className="signup-box">

          <h2>Create Account</h2>
          <p>Sign up to get started</p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="password-box">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit">Sign Up</button>

          </form>

          <p className="login-text">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>
      </div>
    );
  }

  export default Signup;