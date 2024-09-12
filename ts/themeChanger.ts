"use strict";

const themeChanger = (sourceID: string, targetID: string): void => {
  const source: HTMLElement = document.querySelector(sourceID)!;
  const target: HTMLElement = document.querySelector(targetID)!;

  // getting the positions of elements
  const rectS = source.getBoundingClientRect();
  const rectT = target.getBoundingClientRect();
  // calculating horizontal distance between the elements
  const left: number = rectT.left - rectS.left;

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
    const header: HTMLElement = document.querySelector("#header")!;
    const appliedBox: HTMLElement = document.querySelector("#applied-box")!;
    const aside: HTMLElement = document.querySelector("aside")!;
    const main: HTMLElement = document.querySelector("main")!;
    const root = document.querySelector(":root")!;
    const theme: string = sourceID.slice(5);
    const disabledColor: string = getComputedStyle(root).getPropertyValue(
      `--${theme}-disabled`
    );
    const themeBlack: string =
      getComputedStyle(root).getPropertyValue("--black-dk");
    const themeColor: string = getComputedStyle(source).backgroundColor;
    const toggleList = document.querySelectorAll<HTMLInputElement>(
      '.switch > input[type="checkbox"]'
    );
    const toggleMoverList =
      document.querySelectorAll<HTMLElement>(".toggle-mover");
    toggleMoverList.forEach((toggleMover, index) => {
      const toggle = toggleList.item(index);
      const isToggleChecked: Boolean = toggle.checked;
      toggleMover.style.backgroundColor = isToggleChecked
        ? themeColor
        : disabledColor;
      toggle.addEventListener("click", () => {
        if (toggle.checked === true) {
          toggleMover.style.backgroundColor = themeColor;
        } else {
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
