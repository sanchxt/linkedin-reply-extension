import { Modal } from "../types/modal-type";
import { MessageHandler } from "../types/message-type";
import { editSvgIcon } from "@/assets";

export function setupIconInjector(
  modal: Modal,
  messageHandler: MessageHandler
) {
  let currentIcon: HTMLImageElement | null = null;
  let currentParentElement: HTMLElement | null = null;

  function injectIcon(parentElement: HTMLElement) {
    if (currentIcon) {
      currentIcon.remove();
    }

    currentParentElement = parentElement;
    currentIcon = document.createElement("img");
    currentIcon.className = "edit-icon";
    currentIcon.src = editSvgIcon;
    currentIcon.alt = "AI Assistant";
    Object.assign(currentIcon.style, {
      position: "absolute",
      bottom: "5px",
      right: "5px",
      width: "30px",
      height: "30px",
      cursor: "pointer",
      zIndex: "1000",
    });
    parentElement.appendChild(currentIcon);

    currentIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      modal.show();
    });
  }

  function removeIcon() {
    if (currentIcon && currentParentElement) {
      currentIcon.remove();
      currentIcon = null;
      currentParentElement = null;
    }
  }

  document.addEventListener("focusin", (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    const messageBox = target.closest(".msg-form__contenteditable");

    if (messageBox) {
      const parentElement =
        messageBox.closest(".msg-form__container") || messageBox;

      if (parentElement instanceof HTMLElement) {
        messageHandler.setParentElement(parentElement);
        parentElement.style.position = "relative";
        injectIcon(parentElement);
      }
    }
  });

  document.addEventListener("focusout", (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    const messageBox = target.closest(".msg-form__contenteditable");

    if (messageBox) {
      setTimeout(() => {
        if (!document.activeElement?.closest(".msg-form__contenteditable")) {
          removeIcon();
        }
      }, 0);
    }
  });
}
