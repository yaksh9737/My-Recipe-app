// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetails from "./pages/RecipeDetails"; // Import RecipeDetails
import MyFeed from "./pages/MyFeed"; // Import MyFeed
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./context/AuthContext";
import UploadRecipe from "./pages/UploadRecipe";
import EditRecipe from "./pages/EditRecipe";
import Header from "./components/Sidebar";


function App() {
  return (
    <AuthProvider>
      <div className="">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Public route for viewing recipe details */}
            <Route path="/recipes/:id" element={<RecipeDetails />} />{" "}
            {/* Add this route */}
            {/* Public routes (Login and Register) */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            {/* Protected routes */}
            <Route
              path="/myfeed"
              element={
                <ProtectedRoute>
                  <MyFeed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-recipe"
              element={
                <ProtectedRoute>
                  <UploadRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-recipe/:id"
              element={
                <ProtectedRoute>
                  <EditRecipe />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
