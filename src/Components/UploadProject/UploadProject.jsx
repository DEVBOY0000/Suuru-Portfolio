import React, { useEffect, useRef, useState } from "react";
import { storage, database } from "../../Firebase/Firebase";
import { ref as stRef, uploadBytes } from "firebase/storage";
import { ref as dbRef, set, get } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faXmark } from "@fortawesome/free-solid-svg-icons";

const UploadProject = () => {
  const [folder, setFolder] = useState([]);

  const [projects, setProjects] = useState([]);

  const [uploadingState, setUploadingState] = useState(false);

  const textInputRef = useRef();

  const formHandler = (e) => {
    e.preventDefault();
    if (!folder.length) return;
    const folderName = e.target.folder_name.value;
    Promise.all(
      folder.map((file) => {
        const imageRef = stRef(storage, `${file?.webkitRelativePath}`);
        uploadBytes(imageRef, file);
      })
    ).finally(() => setUploadingState(true));
  };

  //get realtime database
  useEffect(() => {
    if (!projects.length) {
      const db = dbRef(database);
      get(db)
        .then((snapshot) =>
          snapshot.exists()
            ? setProjects(snapshot.val())
            : console.error("No data available")
        )
        .catch((error) => console.error(error));
    }
  }, [projects.length]);

  //updata firebase realtime database
  useEffect(() => {
    const url =
      "https://firebasestorage.googleapis.com/v0/b/portofolio-6fbe1.appspot.com/o/";

    if (uploadingState && folder.length) {
      set(dbRef(database, "/" + projects.length), {
        name: textInputRef.current.value,
        image: `${url}${encodeURIComponent(
          textInputRef.current.value + "/"
        )}extra%20(1).jpg?alt=media`,
        video: `${url}${encodeURIComponent(
          textInputRef.current.value +
            "/" +
            folder.filter((file) =>
              file?.webkitRelativePath.includes("mp4")
            )[0]["name"]
        )}?alt=media`,
      })
        .catch((error) => console.error(error))
        .finally(
          () => setUploadingState(false),
          setFolder([]),
          (textInputRef.current.value = "")
        );
    }
  }, [uploadingState, folder.length]);

  console.log(uploadingState);

  return (
    <div className="bg-gray-200 pt-[57px] min-h-[100vh] flex justify-center items-center dark:bg-dark-color">
      <div className="rounded-xl bg-white p-5 flex gap-5 mx-3 max-h-[calc(100vh_-_(57px_+_20px))] xs:h-auto overflow-auto">
        <form onSubmit={(e) => formHandler(e)}>
          <div>
            <input
              type="text"
              placeholder="folder name"
              className="p-2 outline-none border-b-2 w-full"
              id="folder_name"
              required
              ref={textInputRef}
              autoComplete="off"
            />
          </div>
          <div className="my-3 w-[65vw] xs:w-[300px] h-[350px] relative">
            {folder.length ? (
              <div
                className="absolute top-2 right-2 z-10 bg-white w-6 h-6 text-center rounded-full text-xs leading-5 border-2 cursor-pointer"
                onClick={() => (
                  setFolder([]),
                  (textInputRef.current.value = ""),
                  setUploadingState(false)
                )}
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
              accept="*"
              webkitdirectory="true"
              onChange={({ target }) => (
                setFolder([...target.files]),
                (textInputRef.current.value = [
                  ...target.files,
                ][0]?.webkitRelativePath.slice(
                  0,
                  [...target.files][0]?.webkitRelativePath.indexOf("/")
                ))
              )}
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
