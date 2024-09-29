import { themeChanger, applyTheme } from "./themeChanger.js";
import { toggleDisplaySections } from "./toggleSections.js";

if (document.readyState === "loading") {
  // Loading hasn't finished yet

  // adding listeners
  document.addEventListener("DOMContentLoaded", addAllListeners);
  // setting theme
  document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      applyTheme(theme);
    }
  });
} else {
  // `DOMContentLoaded` has already fired

  // adding listeners
  addAllListeners();
  // setting theme
  const theme = localStorage.getItem("theme");
  if (theme) {
    applyTheme(theme);
  }
}

function addAllListeners(): void {
  // Adding event listeners for section-togglers
  const togglesArray: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    ".switch > input[type='checkbox']"
  );

  togglesArray.forEach((toggle) => {
    toggle.addEventListener("change", (event) => {
      if (toggle.parentElement?.parentElement?.innerText) {
        toggleDisplaySections(
          event,
          toggle.parentElement.parentElement.innerText
        );
      } else {
        console.log("section id is undefined");
      }
    });
  });

  // Adding event listeners for theme-boxes
  const themeBoxes: NodeListOf<HTMLElement> =
    document.querySelectorAll(".theme-box-cover");
  themeBoxes.forEach((themeBox) => {
    themeBox.addEventListener("click", () => {
      if (themeBox.id) {
        themeChanger(themeBox.id);
      } else {
        console.log("theme-box id is undefined");
      }
    });
  });
}
