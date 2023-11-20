import { memo, useContext } from "react";
import "../Components/OptionButtons/OptionButtons.css";
import { AppContext } from "../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const OptionButton = ({ children, style, id, state, name }) => {
  const { toggleEditHandler } = useContext(AppContext);
  const navTo = useNavigate();
  const { name: projectName } = useParams();
  const stateHandler = () => (state ? "active" : "not-active");
  const elementClass = `cursor-pointer active:scale-95 select-none absolute ${style} w-[40px] h-[40px] rounded-full shadow-xl shadow-gray dark:bg-white bg-dark-color dark:text-black text-white transition-colors flex justify-center items-center`;

  const scrollToViewHandler = () => {
    const rect = document.getElementById("items").getBoundingClientRect();
    const navbarHeight = document.getElementById("navbar").offsetHeight;

    if (rect.top >= window.innerHeight / 2) {
      window.scrollBy({
        top: rect.top - navbarHeight - 24,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const buttonEventHandler = () => {
    if (id !== "UploadButton") {
      scrollToViewHandler();
    } else {
      navTo(`uploadToProject/${projectName}`);
    }
    toggleEditHandler(name, id);
  };
  return (
    <button
      id={id}
      className={`${stateHandler()} ${elementClass}`}
      onClick={buttonEventHandler}
    >
      {children}
    </button>
  );
};
export default memo(OptionButton);
