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
}
else {
    // `DOMContentLoaded` has already fired
    // adding listeners
    addAllListeners();
    // setting theme
    const theme = localStorage.getItem("theme");
    if (theme) {
        applyTheme(theme);
    }
}
function addAllListeners() {
    // Adding event listeners for section-togglers
    const togglesArray = document.querySelectorAll(".switch > input[type='checkbox']");
    togglesArray.forEach((toggle) => {
        toggle.addEventListener("change", (event) => {
            if (toggle.parentElement?.parentElement?.innerText) {
                toggleDisplaySections(event, toggle.parentElement.parentElement.innerText);
            }
            else {
                console.log("section id is undefined");
            }
        });
    });
    // Adding event listeners for theme-boxes
    const themeBoxes = document.querySelectorAll(".theme-box");
    themeBoxes.forEach((themeBox) => {
        themeBox.addEventListener("click", () => {
            if (themeBox.firstElementChild?.id) {
                themeChanger(themeBox.firstElementChild.id);
            }
            else {
                console.log("theme-box id is undefined");
            }
        });
    });
}
