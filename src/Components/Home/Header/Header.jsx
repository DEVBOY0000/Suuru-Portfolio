import React, { useState, useEffect, useRef } from "react";
import { storage } from "../../../Firebase/Firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const Header = () => {
  const [URL, setURL] = useState(null);

  const scrollToProjects = () => {
    const projectComponent = document.querySelector("#projects").offsetTop;
    window.scroll({ top: projectComponent - 57, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!URL) {
      const listItemsRef = ref(storage, "Banner");
      listAll(listItemsRef).then(({ items }) =>
        items.map((item) => getDownloadURL(item).then((data) => setURL(data)))
      );
    }
  }, [URL]);

  return (
    <div className="h-screen relative">
      <video
        loading="lazy"
        loop
        muted
        autoPlay
        className="w-screen h-screen object-cover object-right"
        src={URL}
      >
        <source type="video/mp4" src={URL}></source>
      </video>
      <div className="w-full h-full absolute top-0 left-0 bg-black opacity-80"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center gap-3 z-0">
        <h1 className="text-center text-[5.5vw] lg:text-[60px] uppercase tracking-wide">
          suuru portfolio
        </h1>
        <button
          className="bg-white p-2 lg:p-3 text-black leading-[1] rounded hover:bg-black hover:text-white capitalize text-[14px] transition-colors"
          onClick={scrollToProjects}
        >
          scroll to projects
        </button>
      </div>
    </div>
  );
};

export default Header;
