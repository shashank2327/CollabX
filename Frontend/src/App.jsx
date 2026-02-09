import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import CreatePost from './pages/CreatePost';
import Profile from "./pages/Profile";
import PostDetails from './pages/PostDetails';
import MyOpenPosts from './pages/MyOpenPosts';
import MyClosedPosts from './pages/MyClosedPosts';
import MyContribution from './pages/MyContribution';
import EditPost from './pages/EditPost';

// Components
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* --- PROTECTED ROUTES --- */}
        {/* Any route inside here requires the user to be logged in */}
        
        <Route path="/feed" element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        } />

        <Route path="/create-post" element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/post/:id" element={
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        } />

        <Route path="/open-posts" element={
          <ProtectedRoute>
            <MyOpenPosts />
          </ProtectedRoute>
        } />

        <Route path="/closed-posts" element={
          <ProtectedRoute>
            <MyClosedPosts />
          </ProtectedRoute>
        } />

        <Route path="/my-contributions" element={
          <ProtectedRoute>
            <MyContribution />
          </ProtectedRoute>
        } />

        <Route path="/edit-post/:id" element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        } />

        {/* Catch all - Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
      <Toaster position="top-center" />
    </div>
  )
}

export default App;