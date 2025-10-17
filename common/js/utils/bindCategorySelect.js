import {
  getFirstCategory,
  getSecondCategory,
  getThirdCategory,
} from "./CourseCategory.js";
import { $ } from "./dom.js";

// 카테고리 select 초기화
export function bindCategorySelect() {
  const firstSelect = $("#create-course-category-primary");
  const secondSelect = $("#create-course-category-secondary");
  const thirdSelect = $("#create-course-category-tertiary");

  // 1차 카테고리 옵션 생성
  if (firstSelect) {
    const firstCategory = getFirstCategory();
    const options = firstCategory
      .map((cate) => `<option value="${cate}">${cate}</option>`)
      .join("");
    firstSelect.innerHTML = `<option value="">1차 카테고리 선택</option>${options}`;
  }

  // 1차 카테고리 변경 이벤트
  firstSelect?.addEventListener("change", (e) => {
    const selectedFirst = e.target.value;
    const secondCategory = getSecondCategory(selectedFirst);

    const options = secondCategory
      .map((cate) => `<option value="${cate}">${cate}</option>`)
      .join("");

    if (secondSelect) {
      secondSelect.innerHTML = `<option value="">2차 카테고리 선택</option>${options}`;
    }

    if (thirdSelect) {
      thirdSelect.innerHTML =
        '<option value="">3차 카테고리 선택 (옵션)</option>';
    }
  });

  // 2차 카테고리 변경 이벤트
  secondSelect?.addEventListener("change", (e) => {
    const selectedFirst = firstSelect.value;
    const selectedSecond = e.target.value;
    const thirdCategory = getThirdCategory(selectedFirst, selectedSecond);

    const options = thirdCategory
      .map((cate) => `<option value="${cate}">${cate}</option>`)
      .join("");

    if (thirdSelect) {
      thirdSelect.innerHTML = `<option value="">3차 카테고리 선택 (옵션)</option>${options}`;
    }
  });
}
