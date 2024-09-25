export { toggleDisplaySections };
function toggleDisplaySections(event, sectionId) {
    const section = document.querySelector(`#${sectionId.toLowerCase()}`);
    // toggling display
    section.classList.toggle("hidden");
    const hiddenMainSections = document.querySelectorAll("#resume-main > section.hidden");
    const hiddenAsideSections = document.querySelectorAll("#resume-aside > section.hidden");
    const resumeWrapper = document.querySelector("#resume-wrapper");
    const resumeMain = document.querySelector("#resume-main");
    const resumeAside = document.querySelector("#resume-aside");
    // for changing the layout of resume if either columns all sections have toggled to hidden state
    // and changing the layout back to 2 columns if both columns have atleast 1 section unhidden
    if (hiddenMainSections.length === 2 || hiddenAsideSections.length === 4) {
        resumeWrapper.style.gridTemplateColumns = "auto";
        resumeMain.classList.add("order0");
        resumeAside.classList.add("order1");
    }
    else {
        resumeWrapper.style.gridTemplateColumns = "min(198px) auto";
        resumeMain.classList.remove("order0");
        resumeAside.classList.remove("order1");
    }
    // Applying color changes on toggle
    const theme = localStorage.getItem("theme") ?? "orange";
    const toggle = event.currentTarget;
    const toggleMover = toggle.parentElement?.lastElementChild;
    const isToggleChecked = toggle.checked;
    const root = document.querySelector(":root");
    const rootStyles = getComputedStyle(root);
    const themeColor = rootStyles.getPropertyValue(`--${theme}-md`);
    const disabledColor = rootStyles.getPropertyValue(`--${theme}-disabled`);
    toggleMover.style.backgroundColor = isToggleChecked
        ? themeColor
        : disabledColor;
}
