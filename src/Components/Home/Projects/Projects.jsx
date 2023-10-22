import React, { useState, useEffect, useContext } from "react";
import { ref, get } from "firebase/database";
import { ref as storageRef, listAll, getDownloadURL } from "firebase/storage";
import { database, storage } from "../../../Firebase/Firebase";

import Project from "./Project";
import { AppContext } from "../../../Context/AppContext";

const Projects = () => {
  const { projects, setProjects } = useContext(AppContext);

  useEffect(() => {
    if (!projects.length) {
      const dbRef = ref(database);
      get(dbRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            const result = snapshot
              .val()
              .map((item) => ({ ...item, playVideoState: false }));
            setProjects(result);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [projects.length]);

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
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 auto-rows-[400px] xs:auto-rows-[450px] sm:auto-rows-[500px] gap-3 p-2 min-h-[calc(100vh_-_(57px))] "
      onMouseUp={console.log("out")}
    >
      {projects.map((project, key) => (
        <Project project={project} key={key} />
      ))}
    </div>
  );
};

export default Projects;
