import { modalTexts } from "../constants/modalTexts.js";

export function updateModalText(modal, mode) {
  const modalId = modal.id;
  // 모달 id에 텍스트 객체 가져오기
  const textConfig = modalTexts[modalId];

  // 모달 mode 를 확인
  if (!textConfig || !textConfig[mode]) return;

  //현재 모드에 맞는 텍스트 가져오기
  const config = textConfig[mode];

  // 모달 내부에서 eyebrow, title, subtitle 선택
  const eyebrowElement = modal.querySelector(".modal__eyebrow");
  const titleElement = modal.querySelector(".modal__title");
  const subtitleElement = modal.querySelector(".modal__subtitle");

  // 요소가 있다면 텍스트 불러오기
  if (eyebrowElement) eyebrowElement.textContent = config.eyebrow;
  if (titleElement) titleElement.textContent = config.title;
  if (subtitleElement) subtitleElement.textContent = config.subtitle;
}
