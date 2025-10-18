import { $ } from "../utils/dom.js";
import { bindModalEvents } from "../utils/bindModalEvents.js";
import { bindCategorySelect } from "../utils/bindCategorySelect.js";
import { validateRegisterCourseForm } from "../utils/validateRegisterCourseForm.js";
import { submitRegisterCourseForm } from "../utils/submitRegisterCourseForm.js";
import { submitEditCourseForm } from "../utils/submitEditCourseForm.js";

export function CourseModal() {
  this.init = () => {
    fetch("../../../common/ui/courseModal.html")
      .then((res) => res.text())
      .then((resText) => {
        $(".container").insertAdjacentHTML("afterbegin", resText);
        bindEvents();
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

    const modalMode = $(".modal").dataset.mode;

    if (!validateRegisterCourseForm()) return;

    const submitHandler = submitByMode[modalMode];
    if (!submitHandler) return;

    const ok = await submitHandler();

    // 모달 HTML 요소의 data-mode 초기화
    if (ok) {
      modalMode = "";
    }
  });
};
