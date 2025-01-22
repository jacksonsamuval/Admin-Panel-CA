import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar"; // Import Navbar component
import LoginForm from "./component/LoginForm";
import AdminDashboard from "./component/AdminDashboard";
import AdminLogin from "./component/AdminLogin"
import VideoUpload from "./component/VideoUpload"
import ViewAllVideos from "./component/ViewAllVideos"
import AddBanner from "./component/AddBanner";
import ViewAllBanners from "./component/ViewAllBanners";

const App = () => {
  const handleLoginSuccess = () => {
    window.location.href = "/dashboard";
  };

  const handleAdminLoginSuccess = () => {
    window.location.href = "/adminDashboard";
  };

  const handleRegisterSuccess = () => {
    alert("Registration successful! Please Login.");
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="app-container">
        
        <Navbar /> {/* Add Navbar here */}
        <Routes>
          <Route
            path="/"
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="adminDashboard"
            element={<AdminDashboard/>}
          />
          <Route
            path="/upload"
            element={<VideoUpload/>}
          />
          <Route 
            path="/viewAllVideos"
            element={<ViewAllVideos/>}
          />
          <Route 
            path="/adminLogin"
            element={<AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess}/>}
          />
          <Route 
            path="/uploadBanners"
            element={<AddBanner/>}
          />

        <Route 
            path="/viewAllBanners"
            element={<ViewAllBanners/>}
          />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
