import { $ } from "../utils/dom.js";
import { bindModalEvents } from "../utils/bindModalEvents.js";
import { RegisterCourseModal } from "../utils/registerCourseModal.js";
import { bindCategorySelect } from "../utils/bindCategorySelect.js";
import { validateRegisterCourseForm } from "../utils/validateRegisterCourseForm.js";

export function CourseModal() {
  this.init = () => {
    fetch("../common/ui/courseModal.html")
      .then((res) => res.text())
      .then((resText) => {
        $(".container").insertAdjacentHTML("afterbegin", resText);
        bindEvents();
      });
  };
  const bindEvents = () => {
    bindModalEvents();
    // 강의 등록 제출
    const createCourseForm = $("#course-create-form");

    createCourseForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validateRegisterCourseForm()) return;
      RegisterCourseModal();
    });

    // 카테고리 셀렉트 초기화
    bindCategorySelect();
  };
}
