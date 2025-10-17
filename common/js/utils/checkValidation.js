import { $ } from "./dom.js";

export function checkValidation() {
  const title = $("#create-course-title").value;
  const description = $("#create-course-summary").value;
  const content = $("#create-course-description").value;
  const thumbnail = $("#create-thumbnail-file").value;
  const level = $("#create-course-difficulty").value;

  const firstCategory = $("#create-course-category-primary").value;
  const secondCategory = $("#create-course-category-secondary").value;
  const thirdCategory = $("#create-course-category-tertiary").value;

  // 수정 필요(동작X)
  const CategoryList = firstCategory && secondCategory && thirdCategory;

  return !title || !description || !content || !thumbnail || !level;
}
