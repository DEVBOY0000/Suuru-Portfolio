import React from "react";
import { Outlet } from "react-router-dom";
import FlotingThemeIcon from "../FlotingThemeIcon/FlotingThemeIcon";
import Navbar from "../Navbar/Navbar";

const ParentApp = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
        {/* <FlotingThemeIcon /> */}
      </div>
    </>
  );
};

export default ParentApp;
