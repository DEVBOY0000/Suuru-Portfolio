import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const FlotingEditIcon = ({ state, handler }) => {
  return (
    <div
      className="cursor-pointer active:scale-95 select-none sticky bottom-5 mb-[96px] sm:mb-[72px] float-right right-5 z-10 w-[60px] h-[60px] rounded-full shadow-xl shadow-gray dark:bg-white bg-dark-color dark:text-black text-white transition-colors flex justify-center items-center"
      onClick={handler}
    >
      {state ? (
        <FontAwesomeIcon icon={faXmark} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faPenToSquare} />
      )}
    </div>
  );
};

export default FlotingEditIcon;
