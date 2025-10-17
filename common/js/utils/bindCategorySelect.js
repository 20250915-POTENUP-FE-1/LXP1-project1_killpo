import {
  getFirstCategories,
  getSecondCategories,
  getThirdCategories,
} from "./CourseCategory.js";
import { $ } from "./dom.js";

// 카테고리 select 초기화
export function bindCategorySelect() {
  const primarySelect = $("#create-course-category-primary");
  const secondarySelect = $("#create-course-category-secondary");
  const tertiarySelect = $("#create-course-category-tertiary");

  // 1차 카테고리 옵션 생성
  if (primarySelect) {
    const firstCategories = getFirstCategories();
    const options = firstCategories
      .map((cate) => `<option value="${cate}">${cate}</option>`)
      .join("");
    primarySelect.innerHTML = `<option value="">1차 카테고리 선택</option>${options}`;
  }

  // 1차 카테고리 변경 이벤트
  primarySelect?.addEventListener("change", (e) => {
    const selectedFirst = e.target.value;
    const secondCategories = getSecondCategories(selectedFirst);

    const options = secondCategories
      .map((cate) => `<option value="${cate}">${cate}</option>`)
      .join("");

    if (secondarySelect) {
      secondarySelect.innerHTML = `<option value="">2차 카테고리 선택</option>${options}`;
    }

    if (tertiarySelect) {
      tertiarySelect.innerHTML =
        '<option value="">3차 카테고리 선택 (옵션)</option>';
    }
  });

  // 2차 카테고리 변경 이벤트
  secondarySelect?.addEventListener("change", (e) => {
    const selectedFirst = primarySelect.value;
    const selectedSecond = e.target.value;
    const thirdCategories = getThirdCategories(selectedFirst, selectedSecond);

    const options = thirdCategories
      .map((cate) => `<option value="${cate}">${cate}</option>`)
      .join("");

    if (tertiarySelect) {
      tertiarySelect.innerHTML = `<option value="">3차 카테고리 선택 (옵션)</option>${options}`;
    }
  });
}
