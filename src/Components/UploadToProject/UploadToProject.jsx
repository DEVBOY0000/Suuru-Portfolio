import React, { useContext, useEffect, useRef, useState } from "react";
import { storage, database } from "../../Firebase/Firebase";
import {
  ref as stRef,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, set, get } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Await, useParams } from "react-router-dom";
import { AppContext } from "./../../Context/AppContext";
import UploadItem from "./UploadItem";
import Waiting from "../../Utils/Waiting";

const UploadToProject = () => {
  const { currentProjectItems } = useContext(AppContext);

  const [uploadingState, setUploadingState] = useState(false);

  const [uploadItems, setUploadItems] = useState([]);

  const [dragDropState, setDragDropState] = useState(false);

  const { name: folderName } = useParams();

  const dropArea = useRef();

  const uploadingOpreation = () => {
    if (!uploadItems.length) return;
    //rename files to extra ...
    const result = [...uploadItems].map((item, index) => {
      const file = new File(
        [item],
        item.type.includes("mp4")
          ? `animation ${lastItemIndex().lastVideoIndex + 1 + index}.mp4`
          : `extra (${lastItemIndex().lastImgIndex + 1 + index}).jpg`,
        { type: item.type }
      );
      file.oldName = item.name;
      return file;
    });

    setUploadingState(true);
    Promise.all(
      result.map(async (file) => {
        const imageRef = stRef(storage, `${folderName}/${file.name}`);
        await uploadBytes(imageRef, file);
      })
    )
      .then(() => setUploadItems([]))
      .finally(() => setUploadingState(false));
  };

  function lastItemIndex() {
    function stringHandler(item, itemIndex, itemType, RGEX) {
      const regex = new RegExp(`[${RGEX}.()]`, "gi");
      return +item
        .substring(itemIndex, item.indexOf(itemType))
        .replace("%20", "")
        .replace(regex, "")
        .toLowerCase();
    }

    const lastImgIndex = Math.max(
      ...currentProjectItems.map((item, _, array) => {
        const types = ["jpg", "jpeg"];
        const imgType = types.filter((type) => item.includes(type))[0];
        const imgIndex = item.indexOf("extra");
        return stringHandler(item, imgIndex, imgType, "a-zA-Z");
      })
    );

    const lastVideoIndex = Math.max(
      ...currentProjectItems.map((item) => {
        const videoIndex = item.indexOf("animation");
        if (videoIndex == -1) return 0;
        return stringHandler(item, videoIndex, ".mp4", "a-zA-Z");
      })
    );

    return { lastImgIndex, lastVideoIndex };
  }

  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
    // [...dropArea.current.children[0].children].map((child) =>
    //   child.addEventListener("drag", function (e) {
    //     e.stopPropagation();
    //   })
    // );
  }, []);

  const onDropFile = (e) => {
    e.preventDefault();
    setDragDropState(false);
    setUploadItems((prev) => [...prev, ...e.dataTransfer.files]);
  };

  return (
    <div
      className="bg-gray-200 pt-[57px] relative dark:bg-dark-color min-h-[calc(100vh_-_(57px_+_15px))] mb-[132px]"
      ref={dropArea}
      onDragOver={(e) => (
        e.preventDefault(), setDragDropState(true), e.stopPropagation()
      )}
      onDragLeave={(e) => (setDragDropState(false), e.stopPropagation())}
      onDrop={(e) => onDropFile(e)}
    >
      {uploadItems.length ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 auto-rows-[400px] xs:auto-rows-[450px] gap-3 mx-3">
            {[...uploadItems].map((item) => {
              return (
                <UploadItem
                  key={item.name}
                  item={item}
                  state={uploadItems}
                  setState={setUploadItems}
                  uploadingState={uploadingState}
                />
              );
            })}
          </div>
          <button
            disabled={uploadingState}
            onClick={uploadingOpreation}
            className={`sticky bottom-[-40px] sm:bottom-10 left-1/2 bg-black text-white dark:bg-white dark:text-black  py-3 px-5 capitalize rounded-md z-40 -translate-x-1/2 translate-y-[-70px] sm:translate-y-[15px] ${
              uploadingState
                ? "cursor-not-allowed opacity-25 pointer-events-auto"
                : "cursor-pointer active:scale-90"
            }`}
          >
            upload files
          </button>
        </>
      ) : (
        <div
          className={`w-[calc(100vw_-_5rem)] sm:w-[600px]  h-[calc(500px_-_57px)] max-h-[100%] border-2 ${
            dragDropState
              ? "border-gray-400  dark:border-gray-700"
              : "border-gray-700  dark:border-gray-200"
          } rounded-lg border-dashed flex justify-center items-center gap-6 flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-upload"
            size="5x"
            className="dark:text-white text-black"
          />
          <h1 className="text-black dark:text-white capitalize text-lg">
            darg and drop your files <br />
            <p className="capitalize text-center">or</p>
          </h1>
          <div className="bg-black  dark:bg-white text-white dark:text-black capitalize  rounded-md active:scale-95">
            <label htmlFor="file" className="py-3 px-5 cursor-pointer block">
              browes files
            </label>
            <input
              id="file"
              type="file"
              className="hidden"
              multiple
              onChange={({ target }) => setUploadItems([...target.files])}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadToProject;
