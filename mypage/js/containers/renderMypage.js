import { $ } from "../../../../common/js/utils/dom.js";
import { CourseItem } from "../components/CourseItem.js";

/**
 * @param {Array<Object>} courseList 전체 강의 목록
 */
export function renderMypage(courseList) {
  // 총 강의 개수 표시
  $(".mypage-content__total").innerHTML = courseList.length;
  if (!courseList.length) {
    $(
      ".course-table__body"
    ).innerHTML = `<p class="course-table-empty-message">등록한 강의가 없어요.</p>`;
  } else {
    $(".course-table__body").innerHTML = courseList
      .map((courseItem) => CourseItem(courseItem))
      .join("");
  }
  // 테이블에 이벤트 핸들러 위임
  bindEvents();
}
const bindEvents = () => {
  $(".course-table__body").addEventListener("click", (e) => {
    const target = e.target;
    // 삭제하기 버튼 클릭 이벤트 등록
    if (target.classList.contains("delete-course-btn")) {
      // 삭제하기 로직 구현 후 유틸 함수로 분리 예정
      const courseRow = target.closest(".course-row");
      const courseId = courseRow.dataset.courseId;
      console.log(courseId);
      alert(`${courseId} 강의를 삭제하시겠어요? 삭제 후 복구가 불가능해요 🥲`);
    }
    // 삭제하기 버튼 클릭 이벤트 등록
    if (target.classList.contains("edit-course-btn")) {
      const courseRow = target.closest(".course-row");
      const courseId = courseRow.dataset.courseId;
      console.log(courseId);
      alert(`${courseId} 강의를 수정하시겠어요?`);
    }
  });
};
