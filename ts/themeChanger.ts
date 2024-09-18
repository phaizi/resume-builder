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

  // timeout is set to make theme changes to take effect after the animation
  setTimeout(() => {
    source.style.transition = "left 0s";
    const header: HTMLElement = document.querySelector("#layout-header")!;
    const appliedBox: HTMLElement = document.querySelector("#applied-box")!;
    const aside: HTMLElement = document.querySelector("#layout-aside")!;
    const main: HTMLElement = document.querySelector("#layout-main")!;

    const photo: HTMLImageElement = document.querySelector("#photo")!;
    const locationImg: HTMLImageElement =
      document.querySelector("#location-img")!;
    const telImg: HTMLImageElement = document.querySelector("#tel-img")!;
    const emailImg: HTMLImageElement = document.querySelector("#email-img")!;
    const linkedinImg: HTMLImageElement =
      document.querySelector("#linkedin-img")!;
    const gitImg: HTMLImageElement = document.querySelector("#git-img")!;

    const sectionHeadingsArray: NodeListOf<HTMLElement> =
      document.querySelectorAll(".section-heading");
    const headingsArray: NodeListOf<HTMLElement> =
      document.querySelectorAll(".heading");
    const bgCirclesArray: NodeListOf<HTMLElement> =
      document.querySelectorAll(".bgcircle");
    const smCirclesArray: NodeListOf<HTMLElement> =
      document.querySelectorAll(".smcircle");
    const circlesDisabledArray: NodeListOf<HTMLElement> =
      document.querySelectorAll(".clr-disabled");

    // getting theme-colors
    const root = document.querySelector(":root")!;
    const rootStyles = getComputedStyle(root);
    const theme: string = sourceID.slice(5);
    const themeColor: string = getComputedStyle(source).backgroundColor;
    const darkThemeColor: string = rootStyles.getPropertyValue(`--${theme}-dk`);
    const lightThemeColor: string = rootStyles.getPropertyValue(
      `--${theme}-lt`
    );
    const disabledColor: string = rootStyles.getPropertyValue(
      `--${theme}-disabled`
    );

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
    locationImg.src = `static/${theme}/location.png`;
    telImg.src = `static/${theme}/tel.png`;
    emailImg.src = `static/${theme}/email.png`;
    linkedinImg.src = `static/${theme}/linkedin.png`;
    gitImg.src = `static/${theme}/git.png`;
    sectionHeadingsArray.forEach((element) => {
      element.style.backgroundColor = darkThemeColor;
    });
    headingsArray.forEach((element) => {
      element.style.color = darkThemeColor;
    });
    bgCirclesArray.forEach((element) => {
      element.style.backgroundColor = themeColor;
      element.style.borderColor = lightThemeColor;
    });
    smCirclesArray.forEach((element) => {
      element.style.backgroundColor = darkThemeColor;
    });
    circlesDisabledArray.forEach((element) => {
      element.style.backgroundColor = disabledColor;
    });
    photo.style.filter = `drop-shadow(0px 0px 4px ${darkThemeColor})`;
    header.style.background = `linear-gradient(100deg, ${darkThemeColor} -50%, ${themeColor})`;
    // header.style.color = "white";
    appliedBox.style.backgroundColor = themeColor;
    aside.style.background = `linear-gradient(100deg, ${darkThemeColor} -50%, ${themeColor})`;
    aside.style.color = "white";
    main.style.borderColor = themeColor;

    // reverting source element back to its original position
    source.style.width = "30px";
    source.style.left = "0px";
    source.style.zIndex = "0";
  }, 1000);
};
