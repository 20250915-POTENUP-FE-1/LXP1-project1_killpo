// 이벤트 위임 방식으로 모달 열기
document.addEventListener("click", (e) => {
  // 버튼 클릭 요소 또는 부모 요소 중에서 modal toggle btn 클래스 찾기
  const button = e.target.closest(".modal-toggle-btn");
  if (button) {
    const modalId = button.dataset.modalTarget;
    if (!modalId) return;

    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "flex";
    }
  }
});

// 이벤트 위임방식 모달 닫기
document.addEventListener("click", (e) => {
  // X 버튼 클릭 클릭 시 닫기
  if (e.target.closest(".modal-close")) {
    const modal = e.target.closest(".modal");
    if (modal) closeModal(modal);
  }

  // 취소 버튼 클릭 시 닫기
  if (e.target.closest(".cancel-btn")) {
    const modal = e.target.closest(".modal");
    if (modal) closeModal(modal);
  }

  // 모달 배경 클릭 시 닫기
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  }
});

function closeModal(modal) {
  modal.style.display = "none";
}
