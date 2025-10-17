import { store } from "../../../common/js/store/localStorage.js";
import { courseList as mockCourseList } from "../../lectures/js/mockData.js";
import { Header } from "../../common/js/components/Header.js";
import { CourseModal } from "../../common/js/components/CourseModal.js";
import { renderMypage } from "../js/containers/renderMypage.js";

// 강좌 리스트 초기 상태
const courseList = store.getLocalStorage("courseList") || mockCourseList; // []

// 최초 마이 페이지 렌더링
renderMypage(courseList);

// CourseModal 초기화
const courseModal = new CourseModal();
courseModal.init();

// Header 초기화
const header = new Header();
header.init();
