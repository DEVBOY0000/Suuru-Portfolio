import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";

const FlotingEdition = () => {
  const { deletionState, del_undel_handler, setDeletionState } =
    useContext(AppContext);

  const [currTargetView, setCurrTargetView] = useState(false);

  useEffect(() => {
    const listener = () => {
      const rect = document.getElementById("items").getBoundingClientRect();

      rect.top <= window.innerHeight / 2
        ? setCurrTargetView(true)
        : setCurrTargetView(false);
    };

    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, [currTargetView]);

  return (
    <div
      className="cursor-pointer active:scale-95 select-none sticky bottom-5 mb-[92px] sx:mb-[96px] sm:mb-[72px] float-right right-5 z-10 w-[60px] h-[60px] rounded-full shadow-xl shadow-gray dark:bg-white bg-dark-color dark:text-black text-white transition-colors flex justify-center items-center"
      onClick={() => del_undel_handler(currTargetView)}
    >
      {deletionState && currTargetView ? (
        <FontAwesomeIcon icon={faXmark} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faPenToSquare} />
      )}
    </div>
  );
};

export default FlotingEdition;
