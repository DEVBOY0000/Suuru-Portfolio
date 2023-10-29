// export const deletedItemsHandler = (item, handler) => {
//   handler((prev) => {
//     const index = prev.indexOf(item);
//     return index === -1 ? [...prev, item] : prev.filter((e) => e !== item);
//   });
// };

import JSZip from "jszip";

export const nextView = (items, currView, handler) => {
  const index = items.findIndex((e) => e === currView);

  return index < items.length - 1
    ? handler(items[index + 1])
    : handler(items[0]);
};

export const prevView = (items, currView, handler) => {
  const index = items.findIndex((e) => e === currView);

  return index > 0
    ? handler(items[index - 1])
    : handler(items[items.length - 1]);
};

export const del_undel_handler = (
  setDeletionState,
  setDeletedItems,
  deletionState
) => {
  return setDeletionState(!deletionState), setDeletedItems([]);
};

export const toggleEditHandler = (
  editState,
  setEditState,
  setOptBtnsState,
  optBtnsState,
  setCurrentIcon,
  currIconName = "fa-solid fa-pen-to-square",
  setEditingOpration,
  id
) => {
  let time;
  if (!editState) {
    setEditState(true);
    setCurrentIcon("fa-solid fa-xmark");
  } else {
    const modal = document.getElementById("Modal");
    modal.classList.replace("animate-fadeIn", "animate-fadeOut");
    time = setTimeout(() => {
      setEditState(false);
    }, 300);
    setCurrentIcon(currIconName);
  }
  setOptBtnsState(!optBtnsState);
  if (currIconName !== "fa-solid fa-pen-to-square") {
    setEditingOpration({ type: id, state: true });
  } else {
    setEditingOpration({ type: "", state: false });
  }
  return () => clearTimeout(time);
};

export const selectedItemsHandler = (item, setSelectedItems) => {
  setSelectedItems((prev) => {
    const index = prev.indexOf(item);
    return index === -1 ? [...prev, item] : prev.filter((e) => e !== item);
  });
};

export const resetEditingStateHandler = (
  setCurrentIcon,
  setEditingOpration,
  setSelectedItems
) => {
  setEditingOpration({ type: "", state: false });
  setCurrentIcon("fa-solid fa-pen-to-square");
  setSelectedItems([]);
};

export const deletedItemsHandler = (selectedItems) => {};

export const downloadItemsHandler = (selectedItems) => {
  async function downloadImage(url) {
    const image = await fetch(url);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "image file name here";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // const zip = new JSZip();

  // return Promise.all(
  //   selectedItems.map((url) =>
  //     fetch(url)
  //       .then((res) => res.blob())
  //       .then((blob) => (blob.name = URL.createObjectURL(blob)))
  //   )
  // ).then((data) => console.log(data));
  return Promise.all(selectedItems.map((url) => downloadImage(url)));
};

export const uplodingItemsHandler = (setSelectedItems, item) => {};
