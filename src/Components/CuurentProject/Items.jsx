import React from "react";
import Item from "./Item";
import { useOutletContext } from "react-router-dom";
import { useScrollToElement } from "../../Hooks/useScrollToElement";

const Items = ({ props: { data, currView, currentViewHandler } }) => {
  const [editable] = useOutletContext();

  useScrollToElement("items", editable);

  return (
    <div
      id="items"
      className="grid xs:grid-cols-[repeat(auto-fill,_minmax(200px,_auto))] grid-cols-2 gap-3 mx-3"
    >
      {data.map((item, i) => (
        <Item props={{ item, currView, currentViewHandler }} key={i} />
      ))}
    </div>
  );
};

export default Items;
