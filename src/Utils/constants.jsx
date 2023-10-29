import {
  faXTwitter,
  faPatreon,
  faDeviantart,
} from "@fortawesome/free-brands-svg-icons";
import DownloadButton from "../Components/OptionButtons/DownloadButton";
import UploadButton from "../Components/OptionButtons/UploadButton";
import DeleteButton from "./../Components/OptionButtons/DeleteButton";

export const navbarLists = {
  home: "",
  "upload project": "uploadProject",
};

export const footerIconsArray = [
  {
    name: "Patreon",
    icon: faPatreon,
    url: "https://www.patreon.com/suuru",
  },
  {
    name: "Twitter",
    icon: faXTwitter,
    url: "https://twitter.com/Suuru_",
  },
  {
    name: "Deviantart",
    icon: faDeviantart,
    url: "https://www.deviantart.com/suuruart",
  },
];

export const optionButtons = [
  {
    class: "bottom-[50px] right-[70px]",
    id: "DeleteButton",
    component: <DeleteButton />,
    name: "fa-solid fa-trash",
  },
  {
    class: "bottom-[80px] right-[25px]",
    id: "DownloadButton",
    component: <DownloadButton />,
    name: "fa-solid fa-download",
  },
  {
    class: "bottom-[0px] right-[80px]",
    id: "UploadButton",
    component: <UploadButton />,
    name: "fa-solid fa-upload",
  },
];
