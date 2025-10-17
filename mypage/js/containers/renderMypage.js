import { $ } from "../../../common/js/utils/dom.js";
import { CourseItem } from "../components/CourseItem.js";
import { deleteCourse } from "../utils/DeleteCourse.js";

/**
 * @param {Array<Object>} courseList 전체 강의 목록
 */

export function renderMypage(courseList) {
  // 총 강의 개수 표시
  $(".mypage-content__total").innerHTML = courseList.length;

  if (!courseList.length) {
    $(".course-table__body").innerHTML = `
      <tr class="course-row course-row--empty">
        <td colspan="4">
          <span class="course-table-empty-message">등록한 강의가 없어요.</span>
        </td>
      </tr>
    `;
  } else {
    $(".course-table__body").innerHTML = courseList
      .map((courseItem) => CourseItem(courseItem))
      .join("");
    bindEvents();
  }
}

const bindEvents = () => {
  $(".course-table__body").addEventListener("click", (e) => {
    const target = e.target;

    if (e.target.closest(".delete-course-btn")) {
      deleteCourse(target);
    }

    if (e.target.closest(".edit-course-btn")) {
      editCourse(target);
      return;
    }
  });
};
