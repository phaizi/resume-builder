const sectionHeadings: string[] = [
  "experience",
  "projects",
  "contact",
  "skills",
  "certifications",
  "education",
];

const addAllListeners = (): void => {
  const togglesArray: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    ".switch > input[type='checkbox']"
  );
  // Adding event listeners for toggles
  togglesArray.forEach((toggle, index) => {
    toggle.addEventListener("change", () => {
      const section: HTMLElement = document.querySelector(
        `#${sectionHeadings[index]}`
      )!;

      section.classList.toggle("hidden");

      const hiddenMainSections: NodeListOf<HTMLElement> =
        document.querySelectorAll("#resume-main > section.hidden");
      const hiddenAsideSections: NodeListOf<HTMLElement> =
        document.querySelectorAll("#resume-aside > section.hidden");
      const resumeWrapper: HTMLElement =
        document.querySelector("#resume-wrapper")!;
      const resumeMain: HTMLElement = document.querySelector("#resume-main")!;
      const resumeAside: HTMLElement = document.querySelector("#resume-aside")!;

      // for changing the layout of resume if either columns all sections have toggled to hidden state
      // and changing the layout back to 2 columns if both columns have atleast 1 section unhidden
      if (hiddenMainSections.length === 2 || hiddenAsideSections.length === 4) {
        resumeWrapper.style.gridTemplateColumns = "auto";
        resumeMain.classList.add("order0");
        resumeAside.classList.add("order1");
      } else {
        resumeWrapper.style.gridTemplateColumns = "min(198px) auto";
        resumeMain.classList.remove("order0");
        resumeAside.classList.remove("order1");
      }
    });
  });
};

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", addAllListeners);
} else {
  // `DOMContentLoaded` has already fired
  addAllListeners();
}
