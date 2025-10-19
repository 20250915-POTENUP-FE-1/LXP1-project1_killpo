import { $ } from "./dom.js";

export function validateCourseForm() {
  const title = $("#create-course-title").value;
  const description = $("#create-course-summary").value;
  const content = $("#create-course-description").value;

  // 썸네일 파일의 value가 아니면 미리보기 이미지의 src를 반환
  const thumbnail =
    $("#create-thumbnail-file").value ||
    $("#current-thumbnail-img").getAttribute("src");

  const level = $("#create-course-difficulty").value;

  const firstCategory = $("#create-course-category-primary").value;
  const secondCategory = $("#create-course-category-secondary").value;
  const thirdCategory = $("#create-course-category-tertiary").value;
  const category = firstCategory && secondCategory && thirdCategory;

  return title && description && content && thumbnail && level && category;
}
