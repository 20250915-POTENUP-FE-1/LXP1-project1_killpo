import { $ } from "../../../common/js/utils/dom.js";
import { CourseItem } from "../components/CourseItem.js";
import { deleteCourse } from "../utils/DeleteCourse.js";

/**
 * @param {Array<Object>} courseList 전체 강의 목록
 */

export function renderMypage(courseList) {
  console.log(courseList);
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
    bindEvents();
  }
}

const bindEvents = () => {
  $(".course-table__body").addEventListener("click", deleteCourse);
};
