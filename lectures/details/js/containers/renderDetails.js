import { $ } from "../../../../common/js/utils/dom.js";
import { detailsSection } from "../components/DetailsSection.js";

/**
 * @param {Array<Object>} courseItem /lectures에서 선택한 강의 객체
 */

export function renderDetails(courseItem) {
  const container = document.querySelector(".lecture-detail");
  container.innerHTML = "";

  // 강의 리스트 렌더링
  if (!courseItem) {
    container.innerHTML = `<p class="lecture-hero-empty-message">강의를 불러들이는데 오류가 발생했습니다.</p>`;
  } else {
    container.innerHTML = detailsSection(courseItem);
    bindEvents();
  }
}

// 이벤트 헨들러 함수 (수강신청 클릭 시)
const bindEvents = () => {
  $(".purchase-card__cta").addEventListener("click", () => {
    alert("죄송합니다. 현재 서비스 준비 중입니다. 🥲");
  });
};
