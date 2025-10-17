import { store } from "../../../common/js/store/localStorage.js";
import { courseList as mockCourseList } from "../../lectures/js/mockData.js";
import { Header } from "../../common/js/components/Header.js";
import { CourseModal } from "../../common/js/components/CourseModal.js";
import { renderMypage } from "../js/containers/renderMypage.js";

const courseList = store.getLocalStorage("courseList") || mockCourseList; // []

// CourseModal 초기화
const courseModal = new CourseModal();
courseModal.init();

// Header 초기화
const header = new Header();
header.init();

renderMypage(courseList);
