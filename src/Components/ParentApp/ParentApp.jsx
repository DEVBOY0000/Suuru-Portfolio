import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import FlotingEdition from "../FlotingEdition/FlotingEdition";
import DeleteButton from "../DeleteButton/DeleteButton";
import { AppContext } from "../../Context/AppContext";
import Modal from "../../Modal/Modal";
import { globalIcons } from "../../Utils/GlobalIcons";

const ParentApp = () => {
  const { deletedItems, editState } = useContext(AppContext);

  const { pathname } = useLocation();

  return (
    <div className="dark:bg-dark-color bg-white ">
      <Navbar />
      <div
        className={
          pathname !== "/Surru-Portfolio"
            ? "mb-[-60px]"
            : "mb-[92px] xs:mb-[96px] sm:mb-[72px]"
        }
      >
        <Outlet />
      </div>
      {pathname !== "/Surru-Portfolio" &&
        pathname !== "/Surru-Portfolio/uploadProject" && <FlotingEdition />}
      <Footer />
      {pathname !== "/Surru-Portfolio" && editState && <Modal />}
    </div>
  );
};

export default ParentApp;
globalIcons();
