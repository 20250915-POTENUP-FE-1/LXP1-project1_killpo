import { $ } from "../utils/dom.js";
import { bindModalEvents, closeModal } from "../utils/bindModalEvents.js";
import { bindCategorySelect } from "../utils/bindCategorySelect.js";
import { validateCourseForm } from "../utils/validateCourseForm.js";
import { submitRegisterCourseForm } from "../utils/submitRegisterCourseForm.js";
import { submitEditCourseForm } from "../utils/submitEditCourseForm.js";
import { setThumbnailPreview } from "../utils/setupThumbnailPreview.js";
import { buildUrl } from "../utils/buildUrl.js";

export function CourseModal() {
  this.init = () => {
    fetch(buildUrl("/common/ui/courseModal.html"))
      .then((res) => res.text())
      .then((resText) => {
        $(".container").insertAdjacentHTML("afterbegin", resText);
        bindEvents();
        // 썸네일 변경 핸들러 등록
        setThumbnailPreview();
      });
  };
}

const bindEvents = () => {
  // 카테고리 렌더링
  bindCategorySelect();
  bindModalEvents();

  const submitByMode = {
    "course-create": submitRegisterCourseForm,
    "course-edit": submitEditCourseForm,
  };

  $("#course-create-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateCourseForm()) return;

    const modalMode = $(".modal").dataset.mode;

    const submitHandler = submitByMode[modalMode];
    if (!submitHandler) return;

    const ok = await submitHandler();

    // 폼 제출 시 모달 HTML 요소 초기화
    if (ok) closeModal(modalMode);
  });
};
