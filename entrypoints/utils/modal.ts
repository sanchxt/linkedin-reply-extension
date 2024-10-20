import { Modal } from "../types/modal-type";
import { modalHtml } from "./constants";
import { setupMessageHandler } from "./messageHandler";

export function createModal(): Modal {
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modalElement = document.getElementById(
    "custom-modal"
  ) as HTMLDivElement;
  const generateBtn = document.getElementById(
    "generate-btn"
  ) as HTMLButtonElement;
  const insertBtn = document.getElementById("insert-btn") as HTMLButtonElement;
  const inputText = document.getElementById("input-text") as HTMLInputElement;
  const messagesDiv = document.getElementById("messages") as HTMLDivElement;

  function handleOutsideClick(event: MouseEvent) {
    if (event.target === modalElement) modal.hide();
  }

  function handleEscKey(event: KeyboardEvent) {
    if (event.key === "Escape") modal.hide();
  }

  const modal: Modal = {
    element: modalElement,
    generateBtn,
    insertBtn,
    inputText,
    messagesDiv,
    show: () => {
      modalElement.style.display = "flex";
      modalElement.addEventListener("click", handleOutsideClick);
      document.addEventListener("keydown", handleEscKey);
    },
    hide: () => {
      modalElement.style.display = "none";
      modalElement.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
      messageHandler.resetModal();
    },
  };

  const messageHandler = setupMessageHandler(modal);

  return modal;
}
