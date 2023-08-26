import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useState } from "react";
import { useCallback } from "react";

const Project = ({ item }) => {
  const [state, setState] = useState(false);

  return (
    <Link to={`project/${item.name}`}>
      <div className="relative group h-full w-full">
        {state ? (
          <video
            loop
            muted
            autoPlay
            playsinline
            autobuffer
            preload="auto"
            className="object-cover h-full"
            src={item.video}
          >
            <source type="video/mp4" src={item.video} />
          </video>
        ) : (
          <LazyLoadImage
            effect="opacity"
            alt={"img"}
            src={item.image}
            className="h-full w-full object-cover"
            height="100%"
            width="100%"
          />
        )}
        <div className="absolute w-full h-full transition-[visibility, opacity] duration-500 bg-black/40 invisible opacity-0 top-0 left-0 text-white flex justify-center items-center group-hover:visible group-hover:opacity-100">
          <h6 className="text-center text-sm xs:text-base">{item.name}</h6>
        </div>
      </div>
    </Link>
  );
};

export default Project;
