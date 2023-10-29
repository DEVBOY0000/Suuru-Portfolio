import { useContext } from "react";
import "../Components/OptionButtons/OptionButtons.css";
import { AppContext } from "../Context/AppContext";

const OptionButton = ({ children, style, id, state, name }) => {
  const { toggleEditHandler } = useContext(AppContext);
  const stateHandler = () => (state ? "active" : "not-active");

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
    scrollToViewHandler();
    toggleEditHandler(name, id);
  };

  return (
    <button
      id={id}
      className={`${stateHandler()} cursor-pointer active:scale-95 select-none absolute ${style} w-[40px] h-[40px] rounded-full shadow-xl shadow-gray dark:bg-white bg-dark-color dark:text-black text-white transition-colors flex justify-center items-center`}
      onClick={buttonEventHandler}
    >
      {children}
    </button>
  );
};
export default OptionButton;
