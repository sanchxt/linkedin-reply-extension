import { createModal } from "./utils/modal";
export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    const modal = createModal();
    // ensures that a click outside the modal hides it if it's open
    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        modal.element.style.display === "flex" &&
        !modal.element.contains(target) &&
        !target.classList.contains("edit-icon")
      ) {
        modal.hide();
      }
    });

    modal.element.addEventListener("click", (event: MouseEvent) => {
      event.stopPropagation();
    });
  },
});
