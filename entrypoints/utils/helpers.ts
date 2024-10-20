export function createMessageElement(
  text: string,
  isUser: boolean
): HTMLDivElement {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = text;
  Object.assign(messageDiv.style, {
    backgroundColor: isUser ? "#DFE1E7" : "#DBEAFE",
    color: "#666D80",
    borderRadius: "12px",
    padding: "10px",
    marginBottom: "5px",
    textAlign: isUser ? "right" : "left",
    maxWidth: "80%",
    alignSelf: isUser ? "flex-end" : "flex-start",
    marginLeft: isUser ? "auto" : "0",
    marginRight: isUser ? "0" : "auto",
  });
  return messageDiv;
}
