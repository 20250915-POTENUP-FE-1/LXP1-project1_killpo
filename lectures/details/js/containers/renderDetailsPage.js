import { detailsPage } from "../components/DetailsPage.js";

/**
 * @param {Array<Object>} courseItem /lectures에서 선택한 강의 객체
 */

export function renderDetailsPage(courseItem) {
  const container = document.querySelector(".lecture-detail");
  container.innerHTML = "";

  // 강의 리스트 렌더링
  if (!courseItem) {
    container.innerHTML = `<p class="lecture-hero-empty-message">강의를 불러들이는데 오류가 발생했습니다.</p>`;
  } else {
    container.innerHTML = detailsPage(courseItem);
  }
}
