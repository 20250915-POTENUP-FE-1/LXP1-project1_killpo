import { $ } from "../utils/dom.js";
import { modalTexts } from "../constants/modalTexts.js";

export function bindModalEvents() {
  $(".container").addEventListener("click", (e) => {
    // 열기
    const openBtn = e.target.closest(".modal-toggle-btn");
    if (openBtn) {
      // 모달 mode 속성 찾기
      const modalMode = openBtn.dataset.modalMode;
      const modal = $(".modal");
      if (modal) {
        // 텍스트 mode에 맞게 업데이트
        updateModalText(modal, modalMode);
        modal.style.display = "flex";

        // 첫 번째 입력 창 포커스
        setTimeout(() => {
          const titleInput = modal.querySelector("input");
          if (titleInput) titleInput.focus();
        }, 50);
        return;
      }
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

export function updateModalText(modal, modalMode) {
  // 모달 id에 텍스트 객체 가져오기
  const textConfig = modalTexts[modalMode];

  // 모달 mode 를 확인
  if (!textConfig) return;

  // 모달 내부에서 상단작은제목, 제목, 서브타이틀 선택
  const eyebrowElement = modal.querySelector(".modal__eyebrow");
  const titleElement = modal.querySelector(".modal__title");
  const subtitleElement = modal.querySelector(".modal__subtitle");

  // 요소가 있다면 텍스트 불러오기
  if (eyebrowElement) eyebrowElement.textContent = textConfig.eyebrow;
  if (titleElement) titleElement.textContent = textConfig.title;
  if (subtitleElement) subtitleElement.textContent = textConfig.subtitle;
}
