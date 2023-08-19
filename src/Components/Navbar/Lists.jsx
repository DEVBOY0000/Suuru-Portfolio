import React from "react";
import { Link } from "react-router-dom";
import { navbarLists } from "../../Utils/constants";
import Theme from "./Theme";

const Lists = ({ StylesHandler }) => {
  return (
    <ul className="gap-5 flex">
      {Object.keys(navbarLists).map((list, i) => (
        <Link key={i} to={navbarLists[list]}>
          <li
            className={`cursor-pointer p-3 py-1 transition-colors ${StylesHandler(
              {
                active: "hover:bg-black hover:text-white",
                unactive: "hover:bg-white hover:text-black",
              }
            )}`}
          >
            {list}
          </li>
        </Link>
      ))}
      <Theme StylesHandler={StylesHandler} />
    </ul>
  );
};

export default Lists;
