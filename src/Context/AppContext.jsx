import React, { createContext, useState } from "react";
import {
  deletedItemsHandler,
  nextView,
  prevView,
  del_undel_handler,
} from "./Actions";

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProjectItems, setCurrentProjectItems] = useState([]);
  const [deletionState, setDeletionState] = useState(false);
  const [deletedItems, setDeletedItems] = useState([]);
  const [currentView, setCurrentView] = useState("");

  const sharedValues = {
    projects,
    setProjects,
    currentProjectItems,
    deletionState,
    deletedItems,
    currentView,
    setDeletionState,
    setDeletedItems,
    setCurrentProjectItems,
    setCurrentView,
    deletedItemsHandler: (item) => deletedItemsHandler(item, setDeletedItems),
    nextView: () => nextView(currentProjectItems, currentView, setCurrentView),
    prevView: () => prevView(currentProjectItems, currentView, setCurrentView),
    del_undel_handler: (currTargetView) =>
      del_undel_handler(
        setDeletionState,
        setDeletedItems,
        deletionState,
        currTargetView
      ),
  };

  return (
    <AppContext.Provider value={sharedValues}>{children}</AppContext.Provider>
  );
};
