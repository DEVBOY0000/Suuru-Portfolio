import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import CurrentView from "./CurrentView";
import Items from "./Items";

const CuurentProject = () => {
  const { currentView } = useContext(AppContext);

  useScrollToTop(currentView);

  return (
    <div className="pt-[57px] flex flex-col">
      <CurrentView />
      <Items />
    </div>
  );
};

export default CuurentProject;
