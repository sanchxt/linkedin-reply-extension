import { insertSvgIcon, generateSvgIcon } from "@/assets";

const modalPrompt = "Your prompt";
const bgColor = "#3B82F6";

export const modalHtml = `
<div id="custom-modal" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); display: none; justify-content: center; align-items: center; z-index: 9999;">
  <div id="modal-content" style="background: white; border-radius: 8px; width: 100%; max-width: 570px; padding: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div id="messages" style="margin-top: 10px; max-height: 200px; overflow-y: auto; padding: 10px;"></div>
    <input id="input-text" type="text" placeholder="${modalPrompt}" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 10px;"/>
    <div style="text-align: right;">
      <button id="insert-btn" style="background: #fff; color: #666D80; padding: 8px 16px; border: 2px solid #666D80; border-radius: 4px; cursor: pointer; display: none; margin-right: 10px;">
        <img src="${insertSvgIcon}" alt="Insert" style="vertical-align: middle; margin-right: 5px; width: 14px; height: 14px;">
        <b>Insert</b>
      </button>
      <button id="generate-btn" style="background: ${bgColor}; color: white; padding: 8px 16px; border: 2px solid ${bgColor}; border-radius: 4px; cursor: pointer;">
        <img src="${generateSvgIcon}" alt="Generate" style="vertical-align: middle; margin-right: 5px; width: 14px; height: 14px">
        <b>Generate</b>
      </button>
    </div>
  </div>
</div>
`;
