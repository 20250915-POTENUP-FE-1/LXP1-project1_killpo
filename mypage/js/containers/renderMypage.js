import { $ } from "../../../../common/js/utils/dom.js";
import { mypageHeader } from "../components/MypageHeader.js";
import { courseTable } from "../components/CourseTable.js";
import { courseRow } from "../components/CourseRow.js";

/**
 * @param {Array<Object>} courseList 전체 강의 목록
 */

export function renderMypage(courseList) {
  const headerContainer = $(".mypage-content__header");
  const tableContainer = $(".course-table");

  // 마이페이지 헤더 렌더링
  headerContainer.innerHTML = mypageHeader(courseList.length);

  // 강의 테이블 렌더링
  tableContainer.innerHTML = courseTable();

  const tbodyContainer = $(".course-table__body");
  tbodyContainer.container = "";

  // 강의 테이블 로우 렌더링
  if (!courseList) {
    tbodyContainer.innerHTML = `<p class="course-table-empty-message">등록한 강의가 없어요.</p>`;
  } else {
    tbodyContainer.innerHTML = courseList.map(courseRow).join("");
    bindEvents();
  }
}

// 이벤트 헨들러 함수 (수강신청 클릭 시)
const bindEvents = () => {
  $(".delete-course-btn").addEventListener("click", (e) => {
    alert("강의를 삭제하시겠어요? 삭제 후 복구가 불가능해요 🥲");
    // 식제 관련 함수
  });
};
