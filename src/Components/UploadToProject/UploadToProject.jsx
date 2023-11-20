import React, { useEffect, useRef, useState } from "react";
import { storage, database } from "../../Firebase/Firebase";
import { ref as stRef, uploadBytes } from "firebase/storage";
import { ref as dbRef, set, get } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";

const UploadToProject = () => {
  const [uploadingState, setUploadingState] = useState(false);

  const [uploadItems, setUploadItems] = useState([]);

  const { name: folderName } = useParams();

  const uploadingOpreation = () => {
    if (!uploadItems.length) return;
    uploadItems.forEach((file) => {
      const imageRef = stRef(storage, `${folderName}/${file.name}`);
      uploadBytes(imageRef, file).then(() => {
        setUploadingState(true);
      });
    });
  };

  console.log(uploadingState);

  return (
    <div className="bg-gray-200 pt-[57px] relative dark:bg-dark-color min-h-[calc(100vh_-_(57px_+_15px))] mb-[132px]">
      {uploadItems.length ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 auto-rows-[400px] xs:auto-rows-[450px] gap-3 mx-3">
            {uploadItems.map((item, key) => {
              return item.type.includes("image") ? (
                <LazyLoadImage
                  key={item.name + key}
                  effect="blur"
                  alt="img"
                  src={URL.createObjectURL(item)}
                  className="h-full object-cover w-full object-top"
                  height="100%"
                  width="100%"
                />
              ) : (
                <video
                  playsInline
                  loading="lazy"
                  className="h-full object-cover w-full object-top"
                  src={URL.createObjectURL(item)}
                >
                  <source
                    type="video/mp4"
                    src={URL.createObjectURL(item)}
                  ></source>
                </video>
              );
            })}
          </div>
          <button
            onClick={uploadingOpreation}
            className="sticky bottom-[-40px] sm:bottom-10 left-1/2 bg-black text-white dark:bg-white dark:text-black  py-3 px-5 capitalize rounded-md active:scale-90 z-40 -translate-x-1/2 translate-y-[-70px] sm:translate-y-[15px]"
          >
            upload files
          </button>
        </>
      ) : (
        <div className="w-[calc(100vw_-_5rem)] sm:w-[600px]  h-[calc(500px_-_57px)] max-h-[100%] border-2 border-gray-500 dark:border-white rounded-lg border-dashed flex justify-center items-center gap-6 flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
