import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../Firebase/Firebase";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import CurrentView from "./CurrentView";
import Items from "./Items";

const CuurentProject = () => {
  const [data, setData] = useState([]);
  const [currView, setCurrView] = useState("");
  const { name } = useParams();

  const currentViewHandler = useCallback(
    (e) => (e !== currView ? setCurrView(e) : false),
    [currView]
  );

  const prev_next_state = (e) => {
    const index = data.findIndex((e) => e === currView);
    if (e === "right_arrow") {
      if (index !== data.length - 1) {
        setCurrView(data[index + 1]);
      } else setCurrView(data[0]);
    } else if (e === "left_arrow") {
      if (index > 0) {
        setCurrView(data[index - 1]);
      } else setCurrView(data[data.length - 1]);
    }
  };

  useEffect(() => {
    if (!data.length) {
      const listItemsRef = ref(storage, name);
      listAll(listItemsRef).then(({ items }) =>
        items.forEach((item) =>
          getDownloadURL(item).then((res) =>
            setData((prev) => {
              const results = [...prev, res];
              return results.filter((e, i, arr) => arr.indexOf(e) === i);
            })
          )
        )
      );
    }
  }, [data.length]);

  useEffect(() => {
    if (!currView) {
      setCurrView(data[0]);
    }
  }, [data.length, currView]);

  useScrollToTop(currView);

  return (
    <div className="p-10 px-0 pt-[57px] flex flex-col overflow-[hidden] ">
      <CurrentView state={currView} arrowHandler={prev_next_state} />
      <Items props={{ data, currView, currentViewHandler }} />
    </div>
  );
};

export default CuurentProject;
