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
import AddSongs from "./component/AddSongs";
import ViewAllSongs from "./component/ViewAllSongs";
import "./App.css";
import ViewAllUser from "./component/ViewAllUser";
import AddPastorId from "./component/AddPastorId";
import ViewAllPastorId from "./component/ViewAllPastorId";
import ViewAllPastors from "./component/ViewAllPastors";

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
          <Route 
            path="/addSongs"
            element={<AddSongs/>}
          />

          <Route 
            path="/viewAllSongs"
            element={<ViewAllSongs/>}
          />

          <Route 
            path="/viewAllUsers"
            element={<ViewAllUser/>}
          />

          <Route 
            path="/addPastorId"
            element={<AddPastorId/>}
          />

          <Route 
            path="/viewAllPastorId"
            element={<ViewAllPastorId/>}
          />

          <Route 
            path="/viewAllPastors"
            element={<ViewAllPastors/>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
