import { $ } from "../utils/dom.js";
import { modalTexts } from "../constants/modalTexts.js";

class Modal {
  constructor(containerSelector = ".container") {
    this.container = $(containerSelector);
    this.init();
  }

  init() {
    this.container.addEventListener("click", (e) => this.handleClick(e));
  }

  handleClick(e) {
    // 열기 버튼 클릭
    const openBtn = e.target.closest(".modal-toggle-btn");
    if (openBtn) {
      const modalMode = openBtn.dataset.modalMode;
      const modal = $(".modal");
      if (modal) this.open(modal, modalMode);
      return;
    }

    // 닫기 버튼 클릭
    const closeBtn = e.target.closest(".modal-close, .cancel-btn");
    if (closeBtn) {
      const modal = closeBtn.closest(".modal");
      if (modal) this.close(modal);
      return;
    }

    // 배경 클릭 시 닫기
    if (e.target.classList.contains("modal")) {
      this.close(e.target);
    }
  }

  open(modal, modalMode) {
    this.updateText(modal, modalMode);
    modal.style.display = "flex";

    // 첫 번째 input에 포커스
    requestAnimationFrame(() => {
      const titleInput = modal.querySelector("input");
      if (titleInput) titleInput.focus();
    });
  }

  close(modal) {
    modal.style.display = "none";
  }

  updateText(modal, modalMode) {
    const textConfig = modalTexts[modalMode];
    if (!textConfig) return;

    const eyebrowElement = modal.querySelector(".modal__eyebrow");
    const titleElement = modal.querySelector(".modal__title");
    const subtitleElement = modal.querySelector(".modal__subtitle");

    if (eyebrowElement) eyebrowElement.textContent = textConfig.eyebrow;
    if (titleElement) titleElement.textContent = textConfig.title;
    if (subtitleElement) subtitleElement.textContent = textConfig.subtitle;
  }
}

export function bindModalEvents() {
  new Modal();
}

export function updateModalText(modal, modalMode) {
  const modalInstance = new Modal();
  modalInstance.updateText(modal, modalMode);
}
