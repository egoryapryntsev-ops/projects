const timeoutDelay = 5000;

let galleryContainerElement = document.getElementById("gallery-container");
let galleryItems = galleryContainerElement.querySelectorAll(".gallery img");
let galleryRadioButtons = galleryContainerElement.querySelectorAll(
  'input[name="gallery-item"]',
);

let timeoutId;

let getNextGalleryItemIndex = (curIndex = 0) => {
  return curIndex + 1 >= galleryItems.length ? 0 : curIndex + 1;
};

let setActiveGalleryItem = (index = 0) => {
  // Set active gallery item
  galleryItems.forEach((galleryItem, i) => {
    index === i
      ? galleryItem.classList.add("active")
      : galleryItem.classList.remove("active");
  });
  // Set checked radio button
  galleryRadioButtons.forEach((radio) => {
    radio.checked = !!(+radio.value === index);
  });

  if (timeoutId) clearTimeout(timeoutId);

  timeoutId = setTimeout(
    () => setActiveGalleryItem(getNextGalleryItemIndex(index)),
    timeoutDelay,
  );
};

galleryRadioButtons.forEach((radio) =>
  radio.addEventListener("change", function () {
    setActiveGalleryItem(+this.value);
  }),
);

window.addEventListener("load", function () {
  timeoutId = setTimeout(
    () => setActiveGalleryItem(getNextGalleryItemIndex(0)),
    timeoutDelay,
  );
});
