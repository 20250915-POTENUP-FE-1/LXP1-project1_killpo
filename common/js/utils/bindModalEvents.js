import { $ } from "../utils/dom.js";
import { modalTexts } from "../constants/modalTexts.js";

export function bindModalEvents() {
  $(".container").addEventListener("click", (e) => {
    const modal = $(".modal");
    const openBtn = e.target.closest(".modal-toggle-btn");

    // 모달 열기
    if (openBtn) {
      // 모달 mode 속성 찾기
      const modalMode = openBtn.dataset.modalMode;
      if (modal) {
        // 모달 요소에 해당 모드 데이터 할당
        modal.dataset.mode = modalMode;

        updateModalText(modal, modalMode);
        modal.style.display = "flex";

        // 첫 번째 입력 창 포커스
        requestAnimationFrame(() => {
          const titleInput = modal.querySelector("input");
          if (titleInput) titleInput.focus();
        });
        return;
      }
    }

    // 닫기
    const closeBtn = e.target.closest(".modal-close, .cancel-btn");
    if (closeBtn) {
      if (modal) closeModal(modal);
      return;
    }

    // 배경 클릭 시 닫기
    if (e.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
}

export function closeModal(modalMode) {
  $(".modal").style.display = "none";
  // 썸네일 미리보기 초기화 및 숨기기
  $("#current-thumbnail-img").style.display = "none";
  $("#current-thumbnail-img").src = "";

  // 수정 모달의 경우 form 초기화
  if (modalMode === "course-edit") {
    $("#course-create-form").reset();
  }

  $(".modal").dataset.mode = "";
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
  const thumbnailElement = modal.querySelector(".modal__thumbnail");
  const imageElement = modal.querySelector(".modal__image");

  // 요소가 있다면 텍스트 불러오기
  if (eyebrowElement) eyebrowElement.textContent = textConfig.eyebrow;
  if (titleElement) titleElement.textContent = textConfig.title;
  if (subtitleElement) subtitleElement.textContent = textConfig.subtitle;
  if (thumbnailElement) thumbnailElement.textContent = textConfig.thumbnail;
  if (imageElement) imageElement.textContent = textConfig.image;
}
