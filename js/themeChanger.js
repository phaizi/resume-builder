export { themeChanger, applyTheme };
function themeChanger(sourceID) {
    const targetID = "#applied-box";
    const source = document.querySelector(`#${sourceID}`);
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
    // timeout is set to make theme changes to take effect after the animation
    setTimeout(() => {
        source.style.transition = "left 0s";
        // getting new theme
        const theme = sourceID.slice(4);
        // setting color-theme in local storage
        localStorage.setItem("theme", theme);
        applyTheme(theme);
        // reverting source element back to its original position
        source.style.width = "30px";
        source.style.left = "0px";
        source.style.zIndex = "0";
    }, 1000);
}
function applyTheme(theme) {
    // getting elements for color changes
    const header = document.querySelector("#layout-header");
    const appliedBox = document.querySelector("#applied-box");
    const aside = document.querySelector("#layout-aside");
    const main = document.querySelector("#layout-main");
    const photo = document.querySelector("#photo");
    const locationImg = document.querySelector("#location-img");
    const telImg = document.querySelector("#tel-img");
    const emailImg = document.querySelector("#email-img");
    const linkedinImg = document.querySelector("#linkedin-img");
    const gitImg = document.querySelector("#git-img");
    const sectionHeadingsArray = document.querySelectorAll(".section-heading");
    const headingsArray = document.querySelectorAll(".heading");
    const bgCirclesArray = document.querySelectorAll(".bgcircle");
    const smCirclesArray = document.querySelectorAll(".smcircle");
    const circlesDisabledArray = document.querySelectorAll(".clr-disabled");
    // getting theme-colors
    const root = document.querySelector(":root");
    const rootStyles = getComputedStyle(root);
    const themeColor = rootStyles.getPropertyValue(`--${theme}-md`);
    const darkThemeColor = rootStyles.getPropertyValue(`--${theme}-dk`);
    const lightThemeColor = rootStyles.getPropertyValue(`--${theme}-lt`);
    const disabledColor = rootStyles.getPropertyValue(`--${theme}-disabled`);
    const toggleList = document.querySelectorAll('.switch > input[type="checkbox"]');
    const toggleMoverList = document.querySelectorAll(".toggle-mover");
    // applying theme color
    if (locationImg) {
        locationImg.src = `static/${theme}/location.png`;
    }
    if (telImg) {
        telImg.src = `static/${theme}/tel.png`;
    }
    if (emailImg) {
        emailImg.src = `static/${theme}/email.png`;
    }
    if (linkedinImg) {
        linkedinImg.src = `static/${theme}/linkedin.png`;
    }
    if (gitImg) {
        gitImg.src = `static/${theme}/git.png`;
    }
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
    if (photo) {
        photo.style.filter = `drop-shadow(0px 0px 4px ${darkThemeColor})`;
    }
    header.style.background = `linear-gradient(100deg, ${darkThemeColor} -50%, ${themeColor})`;
    appliedBox.style.backgroundColor = themeColor;
    aside.style.background = `linear-gradient(100deg, ${darkThemeColor} -50%, ${themeColor})`;
    aside.style.color = "white";
    main.style.borderColor = themeColor;
    toggleMoverList.forEach((toggleMover, index) => {
        const toggle = toggleList.item(index);
        const isToggleChecked = toggle.checked;
        toggleMover.style.backgroundColor = isToggleChecked
            ? themeColor
            : disabledColor;
    });
}
