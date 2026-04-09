import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Article from "./pages/Article";
import Blog from "./pages/Blog";
import Generateimage from "./pages/Generateimage";
import Backgroundremove from "./pages/Backgroundremove";
import Objectremove from "./pages/Objectremove";
import Resumereview from "./pages/Resumereview";
import { Toaster } from "react-hot-toast";
import Community from "./pages/Community";
import { useEffect } from "react";
import Loader from "./component/LogoAnimate";
import { useState } from "react";
import BrandIntro from "./component/BrandIntro";
import AuthInterceptor from "./services/AuthInterceptor";
// import { useAuth } from '@clerk/clerk-react'

const App = () => {
  // const user = useAuth();

  // console.log("Token:", user.getToken().then((token) => console.log(token)));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 9000); // loading time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        <BrandIntro />
      </div>
    );
  }

  return (
    <div>
      <AuthInterceptor />
      <Toaster reverseOrder={true} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<Article />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="generate-image" element={<Generateimage />} />
          <Route path="remove-background" element={<Backgroundremove />} />
          <Route path="remove-object" element={<Objectremove />} />
          <Route path="review-resume" element={<Resumereview />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
