export interface MessageHandler {
  lastGeneratedMessage: string;
  parentElement: HTMLElement | null;
  handleGenerate: () => void;
  handleInsert: () => void;
  setParentElement: (element: HTMLElement | null) => void;
  resetModal: () => void;
}
