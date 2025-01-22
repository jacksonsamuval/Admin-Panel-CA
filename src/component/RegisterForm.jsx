import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";

const RegisterForm = ({ onRegisterSuccess }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // State to store profile picture
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("mobileNo", mobileNo);
      formData.append("name", name);

      if (profilePicture) {
        formData.append("file", profilePicture);
      }

      const response = await axios.post(
        "http://localhost:8080/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Registration successful");
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file); // Update the state with the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePictureUrl(reader.result); // Update the displayed image
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <form onSubmit={handleRegister} className="register-form">
          <div className="logo-container">
            <img src="#" alt="Logo" className="logo" />
          </div>

          <h2>Create an Account</h2>
          <p className="subheading">Fill in the details to register</p>

          {error && <div className="error-message">{error}</div>}

          {/* Profile Picture Upload */}
          <div className="profile-picture-upload">
            <label htmlFor="profile-picture">
              <div className="profile-picture-circle">
                {profilePicture ? (
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile"
                    className="profile-picture"
                  />
                ) : (
                  <span className="upload-icon">+</span>
                )}
              </div>
            </label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Mobile Number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>

          <div className="footer">
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
