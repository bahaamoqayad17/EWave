import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const SiteLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default SiteLayout;
