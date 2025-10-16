import { $ } from "../utils/dom.js";
import { bindModalEvents } from "../utils/bindModalEvents.js";

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

    // 강의 등록 이벤트
    const createCourseModal = $("#course-create");
    const createCourseForm = $("#course-create-form");
    const titleInput = $("#create-course-title");
    const summaryInput = $("#create-course-summary");
  };
}
/* 

  한 줄 요약: 필수·길이 제한

  썸네일 이미지 업로드 제한: 확장자(jpg/png/webp/jpeg) & 용량 ≤ 3MB 검증

  실패 시 alert("이미지 파일 확장자 또는 용량을 확인해주세요.") 메세지

  난이도, 상세설명 입력 필드 바인딩

  취소 버튼

  저장 동작: “저장” 클릭 시 유효성 검증

  통과하면 강의 생성, 누락 시 브라우저 기본 alert로 안내

*/
