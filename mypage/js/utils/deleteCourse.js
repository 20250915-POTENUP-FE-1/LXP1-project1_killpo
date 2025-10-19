import { store } from "../../../common/js/store/localStorage.js";
import { $ } from "../../../common/js/utils/dom.js";
import { courseList as mockCourseList } from "../../../lectures/js/mockData.js";
import { sortCourseList } from "../../../lectures/js/utils/sortCourseList.js";
import { CourseItem } from "../components/CourseItem.js";

export const deleteCourse = (target) => {
  if (target.classList.contains("delete-course-btn")) {
    const courseList = store.getLocalStorage("courseList") || mockCourseList; // []

    // 삭제하기 로직 구현 후 유틸 함수로 분리 예정
    const courseRow = target.closest(".course-row");
    const selectedId = courseRow.dataset.courseId;
    const selectedCourse = courseList.find(
      (course) => course.id === selectedId
    );

    // 확인 버튼 클릭 시 삭제
    if (
      confirm(
        `"${selectedCourse.title}" 강좌를 삭제하시겠어요?\n삭제 후 복구가 불가능해요 🥲`
      )
    ) {
      // 강좌 목록 업데이트
      const updatedCourseList = courseList.filter(
        (course) => course.id !== selectedId
      );
      // 강좌 목록 최신 순으로 정렬
      const sortedCourseList = sortCourseList(
        updatedCourseList,
        "최신 등록 순"
      );
      store.setLocalStorage("courseList", sortedCourseList);

      // 강의 목록 렌더링
      $(".mypage-content__total").innerHTML = sortedCourseList.length;
      $(".course-table__body").innerHTML = sortedCourseList
        .map((courseItem) => CourseItem(courseItem))
        .join("");
    }
  }
};
