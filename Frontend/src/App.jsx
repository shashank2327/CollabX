import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Feed from "./pages/Feed"
import SignUp from "./pages/SignUp"
import Login from './pages/Login';
import Profile from "./pages/Profile"
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import MyOpenPosts from './pages/MyOpenPosts';
import MyClosedPosts from './pages/MyClosedPosts';
import MyContribution from './pages/MyContribution';
import EditPost from './pages/EditPost';

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={authUser ? <Feed /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} /> */}
        {/* <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} /> */}
        <Route path="/" element={<Feed />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/open-posts" element={<MyOpenPosts />} />
        <Route path="/closed-posts" element={<MyClosedPosts />} />
        <Route path="/my-contributions" element={<MyContribution />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        {/* <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} /> */}
      </Routes>

      < Toaster />
    </div>
  )
}

export default App