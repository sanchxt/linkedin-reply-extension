export interface Modal {
  element: HTMLDivElement;
  generateBtn: HTMLButtonElement;
  insertBtn: HTMLButtonElement;
  inputText: HTMLInputElement;
  messagesDiv: HTMLDivElement;
  show: () => void;
  hide: () => void;
}
