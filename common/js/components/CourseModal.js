import { $ } from "../utils/dom.js";
import { bindModalEvents } from "../utils/bindModalEvents.js";
import { RegisterCourseModal } from "../utils/registerCourseModal.js";

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
    // 강의 등록 이벤트 인터랙트
    // 강의 등록 제출
    const createCourseForm = $("#course-create-form");
    if (!createCourseForm) return;

    createCourseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      RegisterCourseModal();
    });
  };

  //   const createCourseForm = $("#course-create-form");
  //   if (createCourseForm) {
  //     createCourseForm.addEventListener("submit", (e) => {
  //       e.preventDefault();
  //       RegisterCourseModal();
  //     });
  //   }
  // };
}
