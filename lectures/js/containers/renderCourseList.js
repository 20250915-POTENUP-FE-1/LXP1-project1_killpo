import { filterCourseList } from "../utils/filterCourseList.js";

/**
 * @description 필터 정보를 기반으로 강의 리스트를 렌더링한다. (추후에 페이지네이션 관련 정보 추가)
 * @param {Array<Object>} courseList 전체 강의 목록
 * @param {Object} filter 필터 조건 { category: string[], level: string[] }
 */
export function renderCourseList(courseList, filter) {
  const container = document.querySelector(".course-grid");
  container.innerHTML = "";

  // 필터링
  const filteredCourseList = filterCourseList(courseList, filter);

  // 페이지 분리

  // 강의 리스트 렌더링
  if (!filteredCourseList.length) {
    container.innerHTML = "<p>조건에 맞는 강의가 없습니다.</p>";
  } else {
    filteredCourseList.forEach((course) => {
      // CourseCard 적용
    });
  }

  // 페이지네이션
}
