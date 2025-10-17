import { CourseCard } from "../components/CourseCard.js";
import { COURSE_PAGE_SIZE } from "../constants/pagination.js";
import { filterCourseList } from "../utils/filterCourseList.js";

/**
 * @description 필터, 페이지네이션 정보를 기반으로 강의 리스트를 렌더링한다.
 * @param {Array<Object>} courseList 전체 강의 목록
 * @param {Object} filter 필터 조건 { category: string[], level: string[] }
 * @param {number} pageNumber 현재 페이지 번호
 */
export function renderCourseList(courseList, filter, pageNumber) {
  const container = document.querySelector(".course-grid");
  container.innerHTML = "";

  // 필터링
  const filteredCourseList = filterCourseList(courseList, filter);

  // 페이지네이션
  const startIndex = (pageNumber - 1) * COURSE_PAGE_SIZE;
  const paginatedCourseList = filteredCourseList.slice(
    startIndex,
    startIndex + COURSE_PAGE_SIZE
  );

  // 강의 리스트 렌더링
  if (!paginatedCourseList.length) {
    container.innerHTML = `<p class="course-card-empty-message">조건에 맞는 강의가 없습니다.</p>`;
  } else {
    container.innerHTML = paginatedCourseList
      .map((courseItem) => CourseCard(courseItem))
      .join("")
  }
}
