import { $ } from "../../../../common/js/utils/dom.js";
import { courseItem } from "../components/CourseItem.js";

/**
 * @param {Array<Object>} courseList 전체 강의 목록
 */

export function renderMypage(courseList) {
  const courseCountElement = $(".mypage-content__total");
  const courseTableBody = $(".course-table__body");

  // 강의 테이블 로우 렌더링
  if (!courseList) {
    courseCountElement.innerHTML = 0;
    courseTableBody.innerHTML = `<p class="course-table-empty-message">등록한 강의가 없어요.</p>`;
  } else {
    // 총 강의 개수 표시
    courseCountElement.innerHTML = courseList.length;
    courseTableBody.innerHTML = courseList.map(courseItem).join("");
  }

  // 테이블에 이벤트 핸들러 위임
  tbodyContainer.addEventListener("click", (e) => {
    const targetElement = e.target;

    // "삭제하기" 클릭 시
    if (targetElement.classList.contains("delete-course-btn")) {
      // 삭제하기 로직 구현 후 유틸 함수로 분리 예정
      const courseRow = targetElement.closest(".course-row");
      const courseId = courseRow.dataset.courseId;
      console.log(courseId);
      alert("강의를 삭제하시겠어요? 삭제 후 복구가 불가능해요 🥲");
    }
  });
}
