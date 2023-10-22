export const deletedItemsHandler = (item, handler) => {
  handler((prev) => {
    const index = prev.indexOf(item);
    return index === -1 ? [...prev, item] : prev.filter((e) => e !== item);
  });
};

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
