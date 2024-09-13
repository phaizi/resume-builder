"use strict";
const themeChanger = (sourceID, targetID) => {
    const source = document.querySelector(sourceID);
    const target = document.querySelector(targetID);
    // getting the positions of elements
    const rectS = source.getBoundingClientRect();
    const rectT = target.getBoundingClientRect();
    // calculating horizontal distance between the elements
    const left = rectT.left - rectS.left;
    // these properties are set before any transition because
    // these properties are later overwritten when the element
    // tracks back to the original position
    source.style.transition = "left 1s";
    source.style.zIndex = "5";
    // initiating animation
    source.style.left = `${left}px`;
    source.style.width = "60px";
    setTimeout(() => {
        source.style.transition = "left 0s";
        const header = document.querySelector("#header");
        const appliedBox = document.querySelector("#applied-box");
        const aside = document.querySelector("#layout-aside");
        const main = document.querySelector("#layout-main");
        const root = document.querySelector(":root");
        const theme = sourceID.slice(5);
        const disabledColor = getComputedStyle(root).getPropertyValue(`--${theme}-disabled`);
        const themeBlack = getComputedStyle(root).getPropertyValue("--black-dk");
        const themeColor = getComputedStyle(source).backgroundColor;
        const toggleList = document.querySelectorAll('.switch > input[type="checkbox"]');
        const toggleMoverList = document.querySelectorAll(".toggle-mover");
        toggleMoverList.forEach((toggleMover, index) => {
            const toggle = toggleList.item(index);
            const isToggleChecked = toggle.checked;
            toggleMover.style.backgroundColor = isToggleChecked
                ? themeColor
                : disabledColor;
            toggle.addEventListener("click", () => {
                if (toggle.checked === true) {
                    toggleMover.style.backgroundColor = themeColor;
                }
                else {
                    toggleMover.style.backgroundColor = disabledColor;
                }
            });
        });
        // applying theme color
        header.style.backgroundColor = themeColor;
        header.style.color = theme === "red" ? "white" : themeBlack;
        appliedBox.style.backgroundColor = themeColor;
        aside.style.backgroundColor = themeColor;
        aside.style.color = theme === "red" ? "white" : themeBlack;
        main.style.borderColor = themeColor;
        // reverting source element back to its original position
        source.style.width = "30px";
        source.style.left = "0px";
        source.style.zIndex = "0";
    }, 1000);
};
