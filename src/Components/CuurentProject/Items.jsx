import React, { useContext, useEffect, Suspense, lazy } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../Firebase/Firebase";
import { AppContext } from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import { useScrollToElement } from "../../Hooks/useScrollToElement";
const Item = lazy(() => import("./Item"));

const Items = () => {
  const {
    currentProjectItems,
    setCurrentProjectItems,
    deletionState,
    setCurrentView,
  } = useContext(AppContext);

  const { name } = useParams();

  useScrollToElement("items", deletionState);

  //get currentProjectItems
  useEffect(() => {
    const listItemsRef = ref(storage, name);
    const result = [];
    setCurrentView("");
    listAll(listItemsRef).then(({ items }) =>
      items.forEach((item) =>
        getDownloadURL(item).then((res) => {
          result.push(res);
          setCurrentProjectItems([...result]);
        })
      )
    );
  }, [name]);

  return (
    <div
      id="items"
      className="min-h-[calc(100vh_-_(57px_+_24px_+_72px))] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 auto-rows-[400px] xs:auto-rows-[450px] gap-3 mx-3"
    >
      {currentProjectItems.map((item, i) => (
        <Suspense fallback="<div>loading....</div>">
          <Item item={item} index={i} key={i} />
        </Suspense>
      ))}
    </div>
  );
  s;
};

export default Items;
