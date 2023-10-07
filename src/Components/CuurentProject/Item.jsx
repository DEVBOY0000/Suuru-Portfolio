import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useOutletContext } from "react-router-dom";

const Item = ({ props: { item, currView, currentViewHandler } }) => {
  const [checked, setCheckedState] = useState(false);

  const contnetType = (text) => {
    return (
      <div
        className={`absolute top-[10px] right-[10px] bg-black/60 px-2 uppercase text-sm text-white`}
      >
        {text}
      </div>
    );
  };

  const [editable] = useOutletContext();

  return (
    <div
      className={`relative h-full cursor-pointer rounded-lg overflow-hidden ${
        currView === item
          ? "border-4 border-black dark:border-white"
          : "hover:border-black dark:hover:border-white hover:border-4"
      }`}
      onClick={() =>
        editable ? setCheckedState(!checked) : currentViewHandler(item)
      }
    >
      {editable && checked && (
        <div className="w-full h-full absolute bg-black/60 flex justify-center items-center">
          <FontAwesomeIcon icon={faCheck} color="white" size="4x" />
        </div>
      )}
      {item?.includes("mp4") ? (
        <>
          {contnetType("mp4")}

          <video loading="lazy" className="h-full object-cover" src={item}>
            <source type="video/mp4" src={item}></source>
          </video>
        </>
      ) : (
        <>
          {contnetType("img")}
          <LazyLoadImage
            alt="img"
            src={item}
            className="h-full object-cover"
            loading="lazy"
          />
        </>
      )}
    </div>
  );
};

export default Item;
