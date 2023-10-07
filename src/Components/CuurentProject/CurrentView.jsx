import React, { memo } from "react";
import left_arrow from "../../SVG/left_arrow.svg";
import right_arrow from "../../SVG/right_arrow.svg";

const CurrentView = ({ state, arrowHandler }) => {
  return (
    <div className="relative w-full max-w-[600px] min-w-fit sm:min-w-[600px] h-[calc(100vh_-_57px)] xs:h-[calc(100vh_-_(3rem_+_57px))] xs:w-[fit-content] mx-auto my-0 xs:my-6 mb-3 rounded-none xs:rounded-lg overflow-hidden">
      <img
        src={left_arrow}
        alt="left_arrow"
        className="w-[40px] h-[40px] p-[13px] rounded-full absolute top-1/2 left-5 cursor-pointer z-10 text-white bg-white "
        onClick={() => arrowHandler("left_arrow")}
      />
      {state?.includes("mp4") ? (
        <video
          loading="lazy"
          className="object-cover w-full h-full "
          loop
          muted
          autoPlay
          playsInline
          preload="auto"
          src={state}
        >
          <source type="video/mp4" src={state}></source>
        </video>
      ) : (
        <img
          loading="lazy"
          className="object-cover w-full h-full object-top"
          src={state}
        />
      )}
      <img
        src={right_arrow}
        alt="right_arrow"
        className="w-[40px] h-[40px] p-[13px] rounded-full absolute top-1/2 right-5 cursor-pointer z-10 text-white bg-white "
        onClick={() => arrowHandler("right_arrow")}
      />
    </div>
  );
};

export default memo(CurrentView);
