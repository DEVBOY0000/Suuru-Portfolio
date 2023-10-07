import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { footerIconsArray } from "../../Utils/constants";
const Footer = () => {
  return (
    <footer className=" dark:bg-dark-color bg-white fixed bottom-0 -z-10 py-3 w-full dark:text-white transition-colors text-black">
      <div className="flex justify-between items-center px-5 flex-col sm:flex-row-reverse">
        <ul className="flex">
          {footerIconsArray.map((list) => (
            <li key={list.name} className="m-3 block">
              <a href={list.url} target="_blank" title={list.name}>
                <FontAwesomeIcon icon={list.icon} className="text-xl" />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm xs:text-base">
          © {new Date().getFullYear()} Suuru Art, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
