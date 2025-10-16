import { $ } from "../utils/dom.js";
import { bindModalEvents } from "../utils/bindModalEvents.js";

export function CourseModal() {
  this.init = () => {
    fetch("/common/ui/courseModal.html")
      .then((res) => res.text())
      .then((resText) => {
        $(".container").insertAdjacentHTML("afterbegin", resText);
        bindEvents();
      });
  };
  const bindEvents = () => {
    bindModalEvents();
    // 강의 등록 이벤트
  };
}
const courseModal = new CourseModal();
courseModal.init();
