import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navbarLists } from "../../Utils/constants";

const ListsMobView = () => {
  const { pathname } = useLocation();

  const activeLinkHandler = (route) => {
    return pathname === `/Surru-Portfolio${route}` ||
      pathname === `/Surru-Portfolio/${route}`
      ? "text-black"
      : "text-gray-400";
  };

  return (
    <div className="fixed bg-white flex-col w-full p-3 -ml-3 top-[57px]">
      <ul>
        {Object.keys(navbarLists).map((item, i) => (
          <Link key={i} to={navbarLists[item]}>
            <li
              className={`py-3 active:text-black hover:text-black transition-colors ${activeLinkHandler(
                navbarLists[item]
              )}`}
            >
              {item}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ListsMobView;
