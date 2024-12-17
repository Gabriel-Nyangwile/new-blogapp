import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import CreateUser from "./components/CreateUser";
import BlogList from "./blogs/BlogList";
import Navbar from "./pages/NavBar";
import Footer from "./pages/Footer";
/* import Home from "./pages/HomePage"; */
import CreateBlog from "./blogs/CreateBlog";
import BlogEdit from "./blogs/BlogEdit";
import { Route, Routes } from "react-router";
import BlogDelete from "./blogs/BlogDelete";
import BlogShow from "./blogs/BlogShow";
import BlogDetails from "./blogs/BlogDetails";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details" element={<BlogDetails />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blogs/:id" element={<ProtectedRoute element={<BlogShow />} />} />
        <Route
          path="/create"
          element={<ProtectedRoute element={<CreateBlog />} />}
        />
        <Route
          path="/update-blog/:id"
          element={<ProtectedRoute element={<BlogEdit />} />}
        />
        <Route
          path="/delete/:id"
          element={<ProtectedRoute element={<BlogDelete />} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
