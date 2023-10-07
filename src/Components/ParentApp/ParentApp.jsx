import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import FlotingEditIcon from "../FlotingEditIcon/FlotingEditIcon";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ParentApp = () => {
  const [editable, setEditable] = useState(false);

  const { pathname } = useLocation();

  const editHandler = () => setEditable(!editable);

  return (
    <div className="dark:bg-dark-color bg-white">
      <Navbar />
      <div
        className={
          pathname !== "/Surru-Portfolio"
            ? "mb-[-72px]"
            : "mb-[96px] sm:mb-[72px]"
        }
      >
        <Outlet context={[editable]} />
      </div>
      {pathname !== "/Surru-Portfolio" && (
        <FlotingEditIcon state={editable} handler={editHandler} />
      )}
      <Footer />
    </div>
  );
};

export default ParentApp;
