import { store } from "../../../common/js/store/localStorage.js";
import { $ } from "../../../common/js/utils/dom.js";
import {
  getFirstCategory,
  getSecondCategory,
  getThirdCategory,
} from "../../../common/js/utils/getCategoryList.js";
import { courseList as mockCourseList } from "../../../lectures/js/mockData.js";

export const editCourse = async (target) => {
  if (target.classList.contains("edit-course-btn")) {
    // 1. 현재 목록에서 선택된 강의 정보 찾기
    const courseList =
      (await store.getLocalStorage("courseList")) || mockCourseList;
    const courseRow = target.closest(".course-row");
    const selectedId = courseRow.dataset.courseId;

    // 배열 업데이트를 위한 인덱스를 찾기
    const selectedIndex = courseList.findIndex(
      (course) => course.id === selectedId
    );
    const selectedCourse = courseList[selectedIndex];

    function renderOptions() {
      const firstSelect = $("#create-course-category-primary");
      const secondSelect = $("#create-course-category-secondary");
      const thirdSelect = $("#create-course-category-tertiary");

      const firstCategory = getFirstCategory();
      const firstOptions = firstCategory
        .map((cate) => `<option value="${cate}">${cate}</option>`)
        .join("");
      firstSelect.innerHTML = `<option value="">1차 카테고리 선택</option>${firstOptions}`;

      const secondCategory = getSecondCategory(selectedCourse.category[0]);
      const secondOptions = secondCategory
        .map((cate) => `<option value="${cate}">${cate}</option>`)
        .join("");
      if (secondSelect) {
        secondSelect.innerHTML = `<option value="">2차 카테고리 선택</option>${secondOptions}`;
      }

      const thirdCategory = getThirdCategory(
        selectedCourse.category[0],
        selectedCourse.category[1]
      );
      const thirdOptions = thirdCategory
        .map((cate) => `<option value="${cate}">${cate}</option>`)
        .join("");
      if (thirdSelect) {
        thirdSelect.innerHTML = `<option value="">3차 카테고리 선택 (옵션)</option>${thirdOptions}`;
      }
    }
    renderOptions();

    // 입력 폼에 객체 정보 업데이트를 위한 아이디 입력
    $("#course-create-form").dataset.courseId = selectedCourse.id;

    // 기존 데이터 로드
    $("#create-course-title").value = selectedCourse.title;
    $("#create-course-summary").value = selectedCourse.description;
    $("#create-course-category-primary").value = selectedCourse.category[0];
    $("#create-course-category-secondary").value = selectedCourse.category[1];
    $("#create-course-category-tertiary").value = selectedCourse.category[2];
    $("#create-course-difficulty").value = selectedCourse.level;
    $("#create-course-description").value = selectedCourse.content;

    // 썸네일 미리보기
    $("#current-thumbnail-img").style.display = "block";
    $("#current-thumbnail-img").src = selectedCourse.thumbnailUrl;
  }
};
