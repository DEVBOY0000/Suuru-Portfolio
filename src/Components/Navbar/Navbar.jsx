import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Lists from "./Lists";
import ListsMobView from "./ListsMobView";
import useMediaQuery from "../../Hooks/useMediaQuery";
import MobMenuIcon from "./MobMenuIcon";
import Theme from "./Theme";

const Navbar = () => {
  const [scrollTop, setScrollTop] = useState(false);
  const [listsState, setListsState] = useState(false);

  const { pathname } = useLocation();

  const lessThanDesktop = useMediaQuery("(max-width: 768px)");

  const StylesHandler = useCallback(
    (home) => {
      if (pathname === "/Surru-Portfolio") {
        return scrollTop ? home.active : home.unactive;
      } else {
        return home.active;
      }
    },
    [pathname, scrollTop]
  );

  useEffect(() => {
    setListsState(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 100
        ? !scrollTop && setScrollTop(true)
        : setScrollTop(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="navbar"
      className={`fixed z-20 p-3 w-full text-white flex sm:justify-between items-center transition-colors  ${StylesHandler(
        {
          active:
            "!bg-white/50 !text-black shadow-2xl shadow-black/20 shadow-black-500/50 dark:!bg-dark-color/50 dark:!text-white backdrop-blur-sm",
          unactive: "bg-transparent !text-white",
        }
      )}`}
    >
      <div>
        <h3 className="uppercase text-[16px] tracking-[7px] leading-[15px] font-bold">
          suuru
        </h3>
        <p className="text-[12px]">creative studio</p>
      </div>
      {!lessThanDesktop && <Lists StylesHandler={StylesHandler} />}
      {lessThanDesktop && (
        <>
          <MobMenuIcon listsState={listsState} setListsState={setListsState} />
          <Theme StylesHandler={StylesHandler} />
        </>
      )}
      {listsState && <ListsMobView />}
    </div>
  );
};

export default Navbar;
