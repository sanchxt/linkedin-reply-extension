import { createModal } from "./utils/modal";
import { setupIconInjector } from "./utils/iconInjector";
import { setupMessageHandler } from "./utils/messageHandler";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    const modal = createModal();
    const messageHandler = setupMessageHandler(modal);
    setupIconInjector(modal, messageHandler);

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
