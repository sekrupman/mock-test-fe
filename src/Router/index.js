import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// IMPORT PAGES
import App from "../App";
import Register from "../register/index";
import Login from "../login";
import Dashboard from "../dashboard";

function Router(){
  const isAuthenticated = !!localStorage.getItem('userId'); 
    return(
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="register" element={<Register />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route
        path="api/tasks/:userId"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      </Routes>
    )
}

export default Router