import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Item = ({ props: { item, currView, currentViewHandler } }) => {
  const contnetType = (text) => {
    return (
      <div
        className={`absolute top-[10px] right-[10px] bg-black/60 px-2 uppercase text-sm text-white`}
      >
        {text}
      </div>
    );
  };

  return (
    <div
      className={`relative h-full cursor-pointer rounded-lg overflow-hidden ${
        currView === item
          ? "border-4 border-black dark:border-white"
          : "hover:border-black dark:hover:border-white hover:border-4"
      }`}
      onClick={() => currentViewHandler(item)}
    >
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
