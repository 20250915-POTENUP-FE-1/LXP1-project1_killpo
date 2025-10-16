import { $ } from "../utils/dom.js";

export function bindModalEvents() {
  $(".container").addEventListener("click", (e) => {
    // 열기
    const openBtn = e.target.closest(".modal-toggle-btn");
    if (openBtn) {
      const modalId = openBtn.dataset.modalTarget;
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "flex";
      return;
    }

    // 닫기
    const closeBtn = e.target.closest(".modal-close, .cancel-btn");
    if (closeBtn) {
      const modal = closeBtn.closest(".modal");
      if (modal) closeModal(modal);
      return;
    }

    // 배경 클릭 시 닫기
    if (e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
  });
}

function closeModal(modal) {
  modal.style.display = "none";
}
