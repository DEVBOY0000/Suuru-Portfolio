import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { ref as storageRef, listAll, getDownloadURL } from "firebase/storage";
import { database, storage } from "../../../Firebase/Firebase";

import Project from "./Project";

const Projects = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!data.length) {
      const dbRef = ref(database);
      get(dbRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setData(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data.length, data]);

  // useEffect(() => {
  //   const allProjectsArray = [];
  //   const listRef = storageRef(storage, "");
  //   listAll(listRef).then(({ prefixes }) => {
  //     return prefixes.map((folderRef, index) => {
  //       if (folderRef.name !== "Banner") {
  //         allProjectsArray.push({ name: folderRef.name });
  //         return listAll(folderRef).then(({ items }) => {
  //           const target = items.find((e) => e.name.includes("extra (1)"));
  //           return allProjectsArray.map((project) =>
  //             getDownloadURL(target).then((res) => (project.image = res))
  //           );
  //         });
  //       }
  //     });
  //   });
  //   console.log(allProjectsArray);
  // }, []);

  return (
    <div
      id="projects"
      className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-2 min-h-[calc(100vh_-_(57px))] "
    >
      {data.map((item, key) => (
        <Project item={item} key={key} />
      ))}
    </div>
  );
};

export default Projects;
