import React, { useState } from "react";
import { storage } from "../../Firebase/Firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";

const UploadProject = () => {
  const [folder, setFolder] = useState([]);

  const formHandler = (e) => {
    e.preventDefault();
    if (!folder.length) return;
    const folderName = e.target.folder_name.value;
    folder.forEach((file) => {
      const imageRef = ref(storage, `${folderName}/${file.name + v4()}`);
      uploadBytes(imageRef, file);
    });
  };

  return (
    <div className="bg-gray-200 pt-[57px] h-[100vh] flex justify-center items-center dark:bg-dark-color">
      <div className="rounded-xl bg-white p-5 flex gap-5 mx-3 max-h-[calc(100vh_-_(57px_+_20px))] xs:h-auto overflow-auto">
        <form onSubmit={(e) => formHandler(e)}>
          <div>
            <input
              type="text"
              placeholder="folder name"
              className="p-2 outline-none border-b-2 w-full"
              id="folder_name"
              required
            />
          </div>
          <div className="my-3 w-[65vw] xs:w-[300px] h-[350px] relative">
            {folder.length ? (
              <div
                className="absolute top-2 right-2 z-10 bg-white w-6 h-6 text-center rounded-full text-xs leading-5 border-2 cursor-pointer"
                onClick={() => setFolder([])}
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
            ) : (
              ""
            )}
            <input
              type="file"
              className="p-2 border hidden"
              id="file_value"
              multiple
              webkitdirectory="true"
              onChange={({ target }) => setFolder([...target.files])}
            />
            <label htmlFor="file_value" className="cursor-pointer">
              <div className=" bg-gray-200 rounded-lg h-full">
                <div className="h-full p-5">
                  <div className="h-full border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center flex-col">
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    <h5>
                      {!folder.length
                        ? "upload folder"
                        : `you have upload ${folder.length} file`}
                    </h5>
                  </div>
                </div>
              </div>
            </label>
          </div>
          <button type="submit" className="capitalize mx-auto p-2 block border">
            upload folder
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProject;
