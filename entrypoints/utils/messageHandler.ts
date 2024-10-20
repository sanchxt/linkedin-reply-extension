import { Modal } from "../types/modal-type";
import { generateMessage } from "./constants";
import { createMessageElement } from "./helpers";
import { MessageHandler } from "../types/message-type";
import { regenerateSvgIcon, generateSvgIcon } from "@/assets";

export function setupMessageHandler(modal: Modal): MessageHandler {
  let lastGeneratedMessage = "";
  let parentElement: HTMLElement | null = null;
  let isGenerating = false;
  let errorMessageElement: HTMLDivElement | null = null;

  const removeErrorMessage = () => {
    if (errorMessageElement && errorMessageElement.parentNode) {
      errorMessageElement.parentNode.removeChild(errorMessageElement);
      errorMessageElement = null;
    }
  };

  const handleGenerate = () => {
    if (isGenerating) return;
    isGenerating = true;

    const inputValue = modal.inputText.value.trim();
    if (!inputValue) {
      removeErrorMessage();
      errorMessageElement = createMessageElement(
        "Please enter a prompt before generating.",
        false
      );
      errorMessageElement.style.color = "red";
      modal.messagesDiv.appendChild(errorMessageElement);
      modal.messagesDiv.scrollTop = modal.messagesDiv.scrollHeight;
      isGenerating = false;
      return;
    }

    removeErrorMessage();

    const userMessageDiv = createMessageElement(inputValue, true);
    modal.messagesDiv.appendChild(userMessageDiv);

    modal.generateBtn.disabled = true;
    modal.generateBtn.textContent = "Loading...";
    modal.generateBtn.style.backgroundColor = "#666D80";

    setTimeout(() => {
      lastGeneratedMessage = generateMessage();
      const generatedMessageDiv = createMessageElement(
        lastGeneratedMessage,
        false
      );
      modal.messagesDiv.appendChild(generatedMessageDiv);
      modal.messagesDiv.scrollTop = modal.messagesDiv.scrollHeight;

      modal.generateBtn.disabled = false;
      modal.generateBtn.style.backgroundColor = "#3B82F6";
      modal.generateBtn.style.color = "white";
      modal.generateBtn.innerHTML = `<img src="${regenerateSvgIcon}" alt="Regenerate" style="vertical-align: middle; margin-right: 5px; width: 16px; height: 16px"> <b>Regenerate</b>`;

      modal.generateBtn.onclick = null;

      modal.inputText.value = "";
      modal.insertBtn.style.display = "inline-block";
      isGenerating = false;
    }, 500);
  };

  const handleInsert = () => {
    if (lastGeneratedMessage && parentElement) {
      parentElement.removeAttribute("aria-label");
      let existingParagraph = parentElement.querySelector("p");
      if (!existingParagraph) {
        existingParagraph = document.createElement("p");
        parentElement.appendChild(existingParagraph);
      }
      existingParagraph.textContent = lastGeneratedMessage;

      const placeholderDiv = parentElement.parentElement?.querySelector(
        ".msg-form__placeholder"
      );
      if (placeholderDiv) {
        placeholderDiv.classList.remove("msg-form__placeholder");
      }

      const sendButton = parentElement.parentElement?.querySelector(
        ".msg-form__send-button"
      );
      if (sendButton instanceof HTMLButtonElement) {
        sendButton.disabled = false;
      }

      const inputEvent = new Event("input", {
        bubbles: true,
        cancelable: true,
      });
      parentElement.dispatchEvent(inputEvent);

      modal.hide();
      modal.insertBtn.style.display = "none";
    }
  };

  const setParentElement = (element: HTMLElement | null) => {
    parentElement = element;
  };

  const resetModal = () => {
    modal.generateBtn.innerHTML = `<img src="${generateSvgIcon}" alt="Generate" style="vertical-align: middle; margin-right: 5px; width: 14px; height: 16px"> <b>Generate</b>`;
    modal.generateBtn.style.backgroundColor = "#3B82F6";
    modal.generateBtn.disabled = false;
    modal.generateBtn.onclick = handleGenerate;
    modal.inputText.value = "";
    modal.messagesDiv.innerHTML = "";
    modal.insertBtn.style.display = "none";
    lastGeneratedMessage = "";
    isGenerating = false;
    removeErrorMessage();
  };

  modal.generateBtn.onclick = handleGenerate;
  modal.insertBtn.onclick = handleInsert;

  modal.inputText.addEventListener("input", () => {
    if (modal.inputText.value.trim() !== "") {
      removeErrorMessage();
    }
  });

  return {
    lastGeneratedMessage,
    parentElement,
    handleGenerate,
    handleInsert,
    setParentElement,
    resetModal,
  };
}
