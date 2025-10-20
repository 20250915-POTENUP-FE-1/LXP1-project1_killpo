import { store } from "../../../common/js/store/localStorage.js";
import { renderDetails } from "./containers/renderDetails.js";
import { courseList as mockCourseList } from "../../js/mockData.js";
import { CourseModal } from "../../../common/js/components/CourseModal.js";
import { Header } from "../../../common/js/components/Header.js";

(async () => {
  // 초기 상태
  const courseList =
    (await store.getLocalStorage("courseList")) || mockCourseList; // []

  // URL에서 강좌 ID 가져오기
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("id");

  // 강좌 리스트에서 강좌 ID로 찾기
  const selectedCourse = courseList.find((course) => course.id === courseId);

  // 강좌 상세 렌더링
  renderDetails(selectedCourse);

  const courseModal = new CourseModal();
  courseModal.init();

  const header = new Header();
  header.init();
})();
